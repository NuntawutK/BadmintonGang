package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/Sakeezt/Badminton/backend/service"

	"golang.org/x/crypto/bcrypt"
)

type LoginPayload struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Use "user" as "entity.Member"
type MemberResponse struct {
	Member     entity.Member `json:"user"`
	RoleName   string        `json:"role"`
	RoleNameTH string        `json:"role_th"`
	Token      string        `json:"token"`
}


// POST /login
func Login(c *gin.Context) {
	var payload LoginPayload
	var user entity.UserLogin

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Raw("SELECT * FROM user_logins WHERE username = ?", payload.Username).Preload("UserRole").Find(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user credentials"})
		return
	}

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.Username)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	var memberRole entity.UserRole
	// var employeeRole entity.UserRole
	entity.DB().Raw("SELECT * FROM user_roles WHERE role_name = ?", "Member").First(&memberRole)
	// entity.DB().Raw("SELECT * FROM user_roles WHERE role_name = ?", "Employee").First(&employeeRole)

	if user.UserRole.RoleName == memberRole.RoleName {
		// Member
		var member entity.Member
		if tx := entity.DB().Preload("UserDetail").
			Raw("SELECT * FROM members WHERE user_login_id = ?", user.ID).Find(&member); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
			return
		}

		tokenResponse := MemberResponse{
			Member:     member,
			RoleName:   memberRole.RoleName,
			Token:      signedToken,
		}

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot find role \"" + user.UserRole.RoleName + "\""})
	}
}
