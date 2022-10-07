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

	// createshutt := entity.ShuttleCock{
	// 	Code: eventshuttlecock.ShuttleCock.Code,
	// }

	var createShutts []entity.ShuttleCock
	for _, shutt := range eventshuttlecock.ShuttleCock {
		var member entity.Member
		if tx := entity.DB().Model(&entity.Member{}).Where("id = ?", shutt.MemberID).First(&member); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
			return
		}
		createshutt := entity.ShuttleCock{
			Code:   shutt.Code,
			Member: member,
		}
		createShutts = append(createShutts, createshutt)
	}

	// if err := entity.DB().Create(&createshutt).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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

	var group entity.Group
	if tx := entity.DB().Where("id = ?", eventshuttlecock.GroupID).First(&group); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "group not found"})
		return
	}

	createEvent := entity.EventShutt{
		Place:            eventshuttlecock.Place,
		TimeStart:        eventshuttlecock.TimeStart,
		TimeStop:         eventshuttlecock.TimeStop,
		ShuttleCock:      createShutts,
		EventGroupMember: newgroupmember,
		Group:            group,
	}

	//บันทึก
	if err := entity.DB().Create(&createEvent).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

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

	idgroup := c.Param("group")

	var eventshutt []entity.EventShutt
	if err := entity.DB().Model(&entity.EventShutt{}).
		Preload("ShuttleCock").
		Preload("ShuttleCock.Member").
		Preload("ShuttleCock.Member.UserDetail").
		Preload("EventGroupMember.GroupMember").
		Preload("EventGroupMember.GroupMember.Member").
		Preload("EventGroupMember.GroupMember.Member.UserDetail").
		Preload("EventGroupMember.EventShutt").
		Find(&eventshutt, entity.DB().Where("group_id = ?", idgroup)).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": eventshutt})
}

func ListEventShuttlecockbyGroup(c *gin.Context) {

	id := c.Param("idgroup")
	var eventshutt []entity.EventShutt
	if err := entity.DB().Preload("EventShutt.GroupMember", "group_id = ?", id).
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

// func ListMemberNOingroup(c *gin.Context) {

// 	idgroup := c.Param("group")

// 	var eventgroup []entity.EventGroupMember

// 	if err := entity.DB().Raw("SELECT * FROM groups WHERE id = ?", id).Find(&group).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": group})
// }
