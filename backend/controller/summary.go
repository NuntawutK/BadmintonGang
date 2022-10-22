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

// GET
func Summaryeventgroupbyid(c *gin.Context) {

	idgroup := c.Param("groupid")

	var groupmember entity.GroupMember
	if err := entity.DB().Model(&entity.GroupMember{}).
		First(&groupmember, entity.DB().Where("id = ?", idgroup)).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var eventgroupmember []entity.EventGroupMember

	if err := entity.DB().Model(&entity.EventGroupMember{}).
		Preload("EventShutt").
		Preload("EventGroupMemberShuttlecock").
		Find(&eventgroupmember, entity.DB().Where("group_member_id = ?", groupmember.ID)).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": eventgroupmember})
}

func Summaryeventbyid(c *gin.Context) {

	idevent := c.Param("eventid")

	var event entity.EventShutt
	if err := entity.DB().Model(&entity.EventShutt{}).
		First(&event, entity.DB().Where("id = ?", idevent)).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var shuttlecock []entity.ShuttleCock

	if err := entity.DB().Model(&entity.ShuttleCock{}).
		Preload("Member").
		Preload("Member.UserDetail").
		Preload("EventGroupMemberShuttlecock.EventGroupMember").
		Preload("EventGroupMemberShuttlecock.EventGroupMember.GroupMember").
		Preload("EventGroupMemberShuttlecock.EventGroupMember.GroupMember.Member").
		Preload("EventGroupMemberShuttlecock.EventGroupMember.GroupMember.Member.UserDetail").
		Find(&shuttlecock, entity.DB().Where("event_shutt_id = ?", event.ID)).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": shuttlecock})

}

// if err := entity.DB().Model(&entity.ShuttleCock{}).
// 	Preload("Member").
// 	Preload("Member.UserDetail").
// 	Find(&shuttlecock, entity.DB().Where("event_shutt_id = ?", event.ID)).Error; err != nil {
// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	return

// }
