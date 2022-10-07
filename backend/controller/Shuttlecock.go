package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/gin-gonic/gin"
)

// POST /event
func AddShuttleCock(c *gin.Context) {

	var shuttlecock entity.ShuttleCock
	if err := c.ShouldBindJSON(&shuttlecock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var eventshutt entity.EventShutt
	if tx := entity.DB().Where("id = ?", shuttlecock.EventShuttID).First(&eventshutt); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "eventshutt not found"})
		return
	}

	var member entity.Member
	if tx := entity.DB().Where("id = ?", shuttlecock.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	AddShuttlecock := entity.ShuttleCock{
		Code:         shuttlecock.Code,
		EventShuttID: &eventshutt.ID,
		Member:       member,
	}

	//บันทึก
	if err := entity.DB().Create(&AddShuttlecock).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": AddShuttlecock})
}

// // GET /getshutt
// func GetAddShutt(c *gin.Context) {
// 	var shutt []entity.ShuttleCock
// 	if err := entity.DB().Raw("SELECT * FROM shuttlecocks ").Scan(&code).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": code})
// }
