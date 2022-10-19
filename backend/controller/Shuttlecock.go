package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/gin-gonic/gin"
)

// POST /addshutt
func AddShuttleCock(c *gin.Context) {

	var shuttlecock entity.ShuttleCock
	if err := c.ShouldBindJSON(&shuttlecock); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// var eventgroupmember entity.EventGroupMember
	// if tx := entity.DB().Where("id = ?", shuttlecockgroupmember.EventGroupMemberID).First(&eventgroupmember); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "eventgroupmember not found"})
	// 	return
	// }

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

	var neweventgroupmembershutt []entity.EventGroupMemberShuttlecock
	for _, item := range shuttlecock.EventGroupMemberShuttlecock {
		var evengroupmember entity.EventGroupMember
		if err := entity.DB().Raw("SELECT * FROM event_group_members WHERE id = ?", item.EventGroupMemberID).Find(&evengroupmember).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		neweventgroupmembershutt = append(neweventgroupmembershutt, entity.EventGroupMemberShuttlecock{EventGroupMember: evengroupmember})

	}

	AddShuttlecock := entity.ShuttleCock{
		Code:                        shuttlecock.Code,
		Member:                      member,
		EventShuttID:                &eventshutt.ID,
		EventGroupMemberShuttlecock: neweventgroupmembershutt,
	}

	// shuttgroupmember := entity.EventGroupMemberShuttlecock{
	// 	ShuttleCock:      AddShuttlecock,
	// 	EventGroupMember: neweventgroupmember,
	// }

	if err := entity.DB().Create(&AddShuttlecock).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": AddShuttlecock})

	// }
	// var ownershutt entity.EventGroupMember
	// for _, item := range eventgroupmembershuttlecock.EventGroupMember {
	// 	var groupmember entity.GroupMember
	// 	if err := entity.DB().Raw("SELECT * FROM group_members WHERE id = ?", item.GroupMemberID).Find(&groupmember).Error; err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 		return
	// 	}

	// 	newgroupmember = append(newgroupmember, entity.EventGroupMember{GroupMember: groupmember})

	// }

	// membershuttlecock := entity.EventGroupMemberShuttlecock{
	// 	ShuttleCock: AddShuttlecock,
	// 	// EventGroupMember: newshuttlecockgroupmember,
	// 	// MemberID:         ownershutt,
	// }
	// //บันทึก
	// if err := entity.DB().Create(&membershuttlecock).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// c.JSON(http.StatusOK, gin.H{"data": membershuttlecock})

}

// // POST /event
// func AddShuttleCock(c *gin.Context) {

// 	var shuttlecock entity.ShuttleCock
// 	if err := c.ShouldBindJSON(&shuttlecock); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	var eventshutt entity.EventShutt
// 	if tx := entity.DB().Where("id = ?", shuttlecock.EventShuttID).First(&eventshutt); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "eventshutt not found"})
// 		return
// 	}

// 	AddShuttlecock := entity.ShuttleCock{
// 		Code:         shuttlecock.Code,
// 		EventShuttID: &eventshutt.ID,
// 		// Member:       newshuttlecockgroupmember,
// 	}
// 	if err := entity.DB().Create(&AddShuttlecock).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	var newshuttlecockgroupmember []entity.EventGroupMember
// 	for _, item := range shuttlecock.EventShutt.EventGroupMember {
// 		var groupmember entity.GroupMember
// 		if err := entity.DB().Raw("SELECT * FROM group_members WHERE id = ?", item.GroupMemberID).Find(&groupmember).Error; err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 			return
// 		}

// 		newgroupmember = append(newgroupmember, entity.EventGroupMember{GroupMember: groupmember})

// 	}
// 	membershuttlecock := entity.EventGroupMemberShuttlecock{
// 		ShuttleCock: AddShuttlecock,
// 		EventGroupMember: eventshutt.EventGroupMember,
// 	}

// }

// // POST /event
// func AddShuttleCock(c *gin.Context) {

// 	var shuttlecock entity.ShuttleCock
// 	if err := c.ShouldBindJSON(&shuttlecock); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	var eventshutt entity.EventShutt
// 	if tx := entity.DB().Where("id = ?", shuttlecock.EventShuttID).First(&eventshutt); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "eventshutt not found"})
// 		return
// 	}

// 	var member entity.Member
// 	if tx := entity.DB().Where("id = ?", shuttlecock.MemberID).First(&member); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
// 		return
// 	}

// 	var newshuttlecockgroupmember []entity.EventGroupMember
// 	for _, item := range shuttlecock.EventShutt.EventGroupMember {
// 		var groupmember entity.GroupMember
// 		if err := entity.DB().Raw("SELECT * FROM group_members WHERE id = ?", item.GroupMemberID).Find(&groupmember).Error; err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 			return
// 		}

// 		newgroupmember = append(newgroupmember, entity.EventGroupMember{GroupMember: groupmember})

// 	}

// 	AddShuttlecock := entity.ShuttleCock{
// 		Code:         shuttlecock.Code,
// 		EventShuttID: &eventshutt.ID,
// 		Member:       member,
// 	}

// 	//บันทึก
// 	if err := entity.DB().Create(&AddShuttlecock).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": AddShuttlecock})
// }
