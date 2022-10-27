package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/asaskevich/govalidator"
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
		Place:     eventshuttlecock.Place,
		TimeStart: eventshuttlecock.TimeStart,
		TimeStop:  eventshuttlecock.TimeStop,
		// ShuttleCock:      createShutts,
		EventGroupMember: newgroupmember,
		Group:            group,
	}
	if _, err := govalidator.ValidateStruct(createEvent); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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

// GET /listevent/:group
func ListEventShuttleCock(c *gin.Context) {

	idgroup := c.Param("group")

	var eventshutt []entity.EventShutt
	if err := entity.DB().Model(&entity.EventShutt{}).
		// Preload("ShuttleCock").
		// Preload("ShuttleCock.Member").
		// Preload("ShuttleCock.Member.UserDetail").
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

func DeleteEventinGroup(c *gin.Context) {
	id := c.Param("id")

	var data entity.EventShutt
	// if err := entity.DB().Model(&entity.EventShutt{}).
	// 	First(&event, entity.DB().Where("id = ?", id)).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	sql := "DELETE FROM event_shutts WHERE id = ?"
	entity.DB().Model(&entity.EventShutt{}).Raw(sql, id).Scan(&data)
	// entity.DB().Delete("DELETE FROM event_shutts WHERE id = ?", id)

	c.JSON(http.StatusOK, gin.H{"data": data})
}

// var eventgroupmember entity.EventGroupMember
// if err := entity.DB().Model(&entity.EventGroupMember{}).
// 	First(&eventgroupmember, entity.DB().Where("event_shutt_id = ?", event.ID)).Error; err != nil {
// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	return
// }

// var shuttlecock entity.ShuttleCock
// if err := entity.DB().Model(&entity.ShuttleCock{}).
// 	First(&shuttlecock, entity.DB().Where("event_shutt_id = ?", event.ID)).Error; err != nil {
// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	return
// }

// var eventgroupmembershutt entity.EventGroupMemberShuttlecock
// if err := entity.DB().Model(&entity.EventGroupMemberShuttlecock{}).
// 	First(&eventgroupmembershutt, entity.DB().Where("event_group_member_id = ?", eventgroupmember.ID)).Error; err != nil {
// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	return
// }

// if err := entity.DB().Model(&entity.EventGroupMemberShuttlecock{}).
// 	First(&eventgroupmembershutt, entity.DB().Where("shuttle_cock_id = ?", shuttlecock.ID)).Error; err != nil {
// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	return
// }

// sql1 := "DELETE FROM event_group_member_shuttlecocks WHERE event_group_member_id = ?"
// entity.DB().Model(&entity.EventGroupMemberShuttlecock{}).Raw(sql1, eventgroupmember.ID).Scan(&eventgroupmembershutt)

// // sql2 := "DELETE FROM event_group_member_shuttlecocks WHERE shuttle_cock_id = ?"
// // entity.DB().Model(&entity.EventGroupMemberShuttlecock{}).Raw(sql2, shuttlecock.ID).Scan(&shuttlecock)

// sql3 := "DELETE FROM event_group_members WHERE event_shutt_id = ?"
// entity.DB().Model(&entity.EventGroupMember{}).Raw(sql3, event.ID).Scan(&eventgroupmember)

// sql4 := "DELETE FROM shuttle_cocks WHERE event_shutt_id = ?"
// entity.DB().Model(&entity.ShuttleCock{}).Raw(sql4, event.ID).Scan(&shuttlecock)

// GET /listevent/membernotingroup/:event
func ListMemberNotInEventShuttleCock(c *gin.Context) {

	id := c.Param("event")

	var eventshutt entity.EventShutt
	if err := entity.DB().Model(&entity.EventShutt{}).
		Preload("EventGroupMember").
		Preload("EventGroupMember.GroupMember").
		Find(&eventshutt, entity.DB().Where("id = ?", id)).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find group member in event and list its ID
	var listGroupMemberIDInEvent []*uint
	for _, item := range eventshutt.EventGroupMember {
		listGroupMemberIDInEvent = append(listGroupMemberIDInEvent, item.GroupMemberID)
	}

	// Find group member not in listGroupMemberIDInEvent and send response
	var groupMember []entity.GroupMember
	if err := entity.DB().Model(&entity.GroupMember{}).
		Preload("Member").
		Preload("Member.UserDetail").
		Preload("Group").
		Not(map[string]interface{}{"id": listGroupMemberIDInEvent}).
		Where("group_id = ?", eventshutt.GroupID).Find(&groupMember).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": groupMember})
}

func ListEventshuttbyid(c *gin.Context) {

	idevent := c.Param("eventid")

	var eventshutt entity.EventShutt
	if err := entity.DB().Model(&entity.EventShutt{}).
		Preload("Group").
		Find(&eventshutt, entity.DB().Where("id = ?", idevent)).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": eventshutt})
}

func ListEventmembershuttgroupbyid(c *gin.Context) {

	idevent := c.Param("eventid")

	var eventshutt entity.EventShutt
	if err := entity.DB().Model(&entity.EventShutt{}).
		Preload("EventGroupMember.GroupMember").
		Preload("EventGroupMember.GroupMember.Member").
		Preload("EventGroupMember.GroupMember.Member.UserDetail").
		Preload("ShuttleCock").
		Preload("ShuttleCock.Member").
		Preload("ShuttleCock.Member.UserDetail").
		Preload("ShuttleCock.EventGroupMemberShuttlecock").
		Preload("ShuttleCock.EventGroupMemberShuttlecock.EventGroupMember.GroupMember.Member").
		Preload("ShuttleCock.EventGroupMemberShuttlecock.EventGroupMember.GroupMember.Member.UserDetail").
		Find(&eventshutt, entity.DB().Where("id = ?", idevent)).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": eventshutt})
}

func ListEventownershuttgroupbyid(c *gin.Context) {

	idevent := c.Param("eventid")

	var eventshutt entity.EventShutt
	if err := entity.DB().Model(&entity.EventShutt{}).
		Preload("ShuttleCock.Member").
		Preload("ShuttleCock.Member.UserDetail").
		Find(&eventshutt, entity.DB().Where("id = ?", idevent)).Error; err != nil {
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

// PATCH /listevent/membernotingroup/:event
func UpdateMemberIntoEvent(c *gin.Context) {
	id := c.Param("event")

	var newEventGroupMember []entity.EventGroupMember
	if err := c.ShouldBindJSON(&newEventGroupMember); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var eventShutt entity.EventShutt
	if tx := entity.DB().Model(&entity.EventShutt{}).
		Where("id = ?", id).First(&eventShutt); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "event shutt not found"})
		return
	}

	eventShutt.EventGroupMember = append(eventShutt.EventGroupMember, newEventGroupMember...)

	if err := entity.DB().Save(&eventShutt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": eventShutt})
}
