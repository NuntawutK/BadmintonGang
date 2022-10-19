package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/gin-gonic/gin"
)

// POST /event
func Summary(c *gin.Context) {

	var summary entity.Summary
	if err := c.ShouldBindJSON(&summary); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var eventshutt entity.EventShutt
	if tx := entity.DB().Where("id = ?", summary.EventShuttID).First(&eventshutt); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "shuttlecock not found"})
		return
	}

	Totalsummary := entity.Summary{
		EventShuttID: &eventshutt.ID,
		TotalPrice:   summary.TotalPrice,
	}

	//บันทึก
	if err := entity.DB().Create(&Totalsummary).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Totalsummary})
}
