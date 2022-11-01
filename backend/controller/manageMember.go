package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// GET /ID
func ListDetail(c *gin.Context) {
	var member entity.Member

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM members WHERE detail_id = ?", id).Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": member})
}

// PATCH
func UpdateAccount(c *gin.Context) {
	var dataUserDetail entity.UserDetail
	var new_dataUserDetail entity.UserDetail
	if err := c.ShouldBindJSON(&dataUserDetail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", dataUserDetail.ID).Find(&new_dataUserDetail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "New data Member not found"})
		return
	}

	new_dataUserDetail.FirstName = dataUserDetail.FirstName
	new_dataUserDetail.LastName = dataUserDetail.LastName
	new_dataUserDetail.Nickname = dataUserDetail.Nickname
	new_dataUserDetail.PhoneNumber = dataUserDetail.PhoneNumber
	new_dataUserDetail.PromtPay = dataUserDetail.PromtPay
	new_dataUserDetail.Qrcode = dataUserDetail.Qrcode

	updatAccout := entity.UserDetail{
		FirstName:   new_dataUserDetail.FirstName,
		LastName:    new_dataUserDetail.LastName,
		Nickname:    new_dataUserDetail.Nickname,
		PhoneNumber: new_dataUserDetail.PhoneNumber,
		PromtPay:    new_dataUserDetail.PromtPay,
	}

	if _, err := govalidator.ValidateStruct(updatAccout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&new_dataUserDetail).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": new_dataUserDetail})
}
