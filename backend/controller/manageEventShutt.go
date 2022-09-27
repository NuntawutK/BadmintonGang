package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/gin-gonic/gin"
)

// POST /event
func CreateEventShuttleCock(c *gin.Context) {

	var eventshuttlecock entity.EventShutt
	//var groupmember entity.GroupMember

	if err := c.ShouldBindJSON(&eventshuttlecock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// if tx := entity.DB().Where("id = ?", joinevent.JoinGroupID).First(&joingroup); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
	// 	return
	// }

	createshutt := entity.ShuttleCock{
		Code: eventshuttlecock.ShuttleCock.Code,
	}

	if err := entity.DB().Create(&createshutt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// if tx := entity.DB().Where("id = ?", eventshuttlecock.ShuttleCockID).First(&eventshuttlecock); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "shuttle cock not found"})
	// 	return
	// }
	var newgroupmember []entity.EventGroupMember
	for _, item := range eventshuttlecock.EventGroupMember {
		var groupmember entity.GroupMember
		if err := entity.DB().Raw("SELECT * FROM group_members WHERE id = ?", item.GroupMemberID).Find(&groupmember).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		newgroupmember = append(newgroupmember, entity.EventGroupMember{GroupMember: groupmember})
	}

	createEvent := entity.EventShutt{
		Place:            eventshuttlecock.Place,
		TimeStart:        eventshuttlecock.TimeStart,
		TimeStop:         eventshuttlecock.TimeStop,
		ShuttleCock:      createshutt,
		EventGroupMember: newgroupmember,
	}

	//บันทึก
	if err := entity.DB().Create(&createEvent).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// if tx := entity.DB().Where("id = ?", joinevent.JoinGroupID).First(&joingroup); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
	// 	return
	// }
	// if tx := entity.DB().Where("id = ?", joinevent.EventShuttID).First(&eventshuttlecock); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
	// 	return
	// }

	// createventgroupmember := entity.EventGroupMember{

	// 	GroupMember: groupmember,
	// 	EventShutt:  createEvent,
	// }
	// if err := entity.DB().Create(&createventgroupmember).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	c.JSON(http.StatusOK, gin.H{"data": createEvent})
}

// GET /getshutt
func GetShutt(c *gin.Context) {
	var code []entity.ShuttleCock
	if err := entity.DB().Raw("SELECT * FROM shuttlecocks ").Scan(&code).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": code})
}

func ListEventShuttleCock(c *gin.Context) {

	// id := c.Param("group")
	// var eventshutt []entity.EventGroupMember
	// if err := entity.DB().Preload("GroupMember.Group").Preload("GroupMember.Member.UserDetail").Preload("EventShutt.ShuttleCock").Preload("GroupMember").Preload("EventShutt").Raw("SELECT * FROM event_group_members WHERE event_shutt_id", id).Find(&eventshutt).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// c.JSON(http.StatusOK, gin.H{"data": eventshutt})

	// id := c.Param("group")
	// var eventShutts []entity.EventShutt
	// if err := entity.DB().Table("event_shutts").Preload("EventGroupMember.GroupMember", "group_id = ?", id).
	// 	Preload("EventGroupMember.GroupMember.Group").Preload("EventGroupMember.GroupMember.Member.UserDetail").Find(&eventShutts).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// c.JSON(http.StatusOK, gin.H{"data": eventShutts})

	id := c.Param("group")
	var eventshutt []entity.EventShutt
	if err := entity.DB().Preload("EventGroupMember.GroupMember", "group_id = ?", id).
		Preload("ShuttleCock").
		Find(&eventshutt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": eventshutt})
}

func EventMember(c *gin.Context) {

	id := c.Param("eventid")
	var groupeventmember []entity.EventGroupMember

	if err := entity.DB().Preload("EventShutt", "event_shutt_id = ?", id).
		Preload("GroupMember.Member.UserDetail").
		Find(&groupeventmember).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": groupeventmember})
}
