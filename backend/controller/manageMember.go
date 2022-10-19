package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/Sakeezt/Badminton/backend/entity"
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

	new_dataUserDetail.PriceShutt = dataUserDetail.PriceShutt
	new_dataUserDetail.PhoneNumber = dataUserDetail.PhoneNumber
	new_dataUserDetail.PromtPay = dataUserDetail.PromtPay

	if err := entity.DB().Save(&new_dataUserDetail).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": new_dataUserDetail})
}

// Update

// func UpdateAccount(c *gin.Context) {
// 	username, _ := c.Get("username")
// 	id := c.Param("id")

// 	var member entity.Member
// 	entity.DB().Model(&entity.Member{}).Preload("UserLogin").Joins("UserLogin").Where("`UserLogin__username` = ?", username).First(&member)

// 	var userdetail entity.UserDetail
// 	if err := c.ShouldBindJSON(&userdetail); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	var update_member entity.Member
// 	entity.DB().Model(&entity.Member{}).Find(&update_member, entity.DB().Where("`id` = ?", id))

// 	update_member = member
// 	update_member.UserDetail = userdetail

// 	// if _, err := govalidator.ValidateStruct(update_manageSalary); err != nil {
// 	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	// 	return
// 	// }

// 	if err := entity.DB().Save(&update_member).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": update_member})
// }
