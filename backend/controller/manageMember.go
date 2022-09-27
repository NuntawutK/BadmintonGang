package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/Sakeezt/Badminton/backend/entity"
)

// GET /ID
func ListDetail(c *gin.Context) {
	var member entity.Member
	

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM members WHERE detail_id = ?",id).Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": member})
}


//POST
// func CreateAccount(c *gin.Context) {
// 	username, _ := c.Get("username")

// 	var member entity.Member
// 	entity.DB().Model(&entity.Member{}).Preload("UserLogin").Joins("UserLogin").Where("`UserLogin__username` = ?", username).First(&member)

// 	var userdetail entity.UserDetail
	
// 	if err := c.ShouldBindJSON(&member); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// 13: ค้นหา BonusStatus ด้วย id
// 	if tx := entity.DB().Model(&entity.UserDetail{}).First(&userdetail, entity.DB().Where("id = ?", member.UserDetailID)); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "UserDetail not found"})
// 		return
// 	}

// 	// 14: สร้าง CreateAccount
// 	ac := entity.Member{
// 		UserDetail: member.UserDetail.FirstName, member.UserDetail.LastName, member.UserDetail.Nickname, member.UserDetail.PhoneNumber, member.UserDetail.PromtPay, member.UserDetail.PriceShutt,
		
// 	}

// 	// // ขั้นตอนการ validation entity ManageSalary -> BonusAmount, BonusDetail, CreateAt
// 	// if _, err := govalidator.ValidateStruct(ms); err != nil {
// 	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	// 	return
// 	// }

// 	// 15: บันทึก
// 	if err := entity.DB().Create(&ac).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": ac})
// }


// Update

func UpdateAccount(c *gin.Context) {
	username, _ := c.Get("username")
	id := c.Param("id")

	var member entity.Member
	entity.DB().Model(&entity.Member{}).Preload("UserLogin").Joins("UserLogin").Where("`UserLogin__username` = ?", username).First(&member)

	var userdetail entity.UserDetail
	if err := c.ShouldBindJSON(&userdetail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var update_member entity.Member
	entity.DB().Model(&entity.Member{}).Find(&update_member, entity.DB().Where("`id` = ?", id))

	update_member = member
	update_member.UserDetail = userdetail
	

	

	// if _, err := govalidator.ValidateStruct(update_manageSalary); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	if err := entity.DB().Save(&update_member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_member})
}


// func ListDetail(c *gin.Context) {
// 	id := c.Param("id")
// 	var userdetail []entity.UserDetail
// 	var member []entity.Member

// 	if tx := entity.DB().Where("codes = ?", id).Find(&userdetail); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "userdetail not found"})
// 		return
// 	}

// 	for _, ude := range userdetail {
// 		var m entity.Member
// 		if tx := entity.DB().
// 			Preload("UserLogin").
// 			Preload("UserDetail").
// 			Preload("Shutt").
// 			Where("userdetail_id = ?", ude.ID).Find(&m); tx.RowsAffected == 0 {
// 			continue
// 		} else {
// 			member = append(member, m)
// 		}
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": member})
// }


