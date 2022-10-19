package controller

import (
	"net/http"

	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

// POST /register
func Register(c *gin.Context) {

	var member entity.Member
	var userRole entity.UserRole

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// if tx := entity.DB().Where("id = ?", member.UserLogin.UserRoleID).First(&userRole); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
	// 	return
	// }

	if err := entity.DB().Model(&entity.UserRole{}).Where("role_name = ?", "Member").First(&userRole).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member role not found"})
		return
	}

	createuserloginvalidator := entity.UserLogin{
		Username: member.UserLogin.Username,
		Password: member.UserLogin.Password,
		UserRole: userRole,
	}
	if _, err := govalidator.ValidateStruct(createuserloginvalidator); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	createuserlogin := entity.UserLogin{
		Username: member.UserLogin.Username,
		Password: SetupPasswordHash(member.UserLogin.Password),
		UserRole: userRole,
	}

	createUserdetail := entity.UserDetail{
		FirstName:   member.UserDetail.FirstName,
		LastName:    member.UserDetail.LastName,
		Nickname:    member.UserDetail.Nickname,
		PhoneNumber: member.UserDetail.PhoneNumber,
		PromtPay:    member.UserDetail.PromtPay,
		PriceShutt:  member.UserDetail.PriceShutt,
	}
	if _, err := govalidator.ValidateStruct(createUserdetail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Create(&createUserdetail).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	createmember := entity.Member{
		UserLogin:  createuserlogin,
		UserDetail: createUserdetail,
	}
	if _, err := govalidator.ValidateStruct(createmember); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&createmember).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": createmember})

}
func GetRole(c *gin.Context) {
	var role []entity.UserRole
	if err := entity.DB().Raw("SELECT * FROM user_roles").Scan(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": role})
}
