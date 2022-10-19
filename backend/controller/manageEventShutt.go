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

	// var createShutts []entity.ShuttleCock
	// for _, shutt := range eventshuttlecock.ShuttleCock {
	// 	var member entity.Member
	// 	if tx := entity.DB().Model(&entity.Member{}).Where("id = ?", shutt.MemberID).First(&member); tx.RowsAffected == 0 {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
	// 		return
	// 	}
	// 	createshutt := entity.ShuttleCock{
	// 		Code:   shutt.Code,
	// 		Member: member,
	// 	}
	// 	if _, err := govalidator.ValidateStruct(createshutt); err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 		return
	// 	}
	// 	createShutts = append(createShutts, createshutt)
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

// func ListEventbyid(c *gin.Context) {

// 	idevent := c.Param("eventid")

// 	var eventshutt entity.EventShutt
// 	if err := entity.DB().Model(&entity.EventShutt{}).
// 		Preload("ShuttleCock").
// 		Preload("ShuttleCock.Member").
// 		Preload("ShuttleCock.Member.UserDetail").
// 		Preload("EventGroupMember.GroupMember").
// 		Preload("EventGroupMember.GroupMember.Member").
// 		Preload("EventGroupMember.GroupMember.Member.UserDetail").
// 		Preload("EventGroupMember.EventShutt").
// 		Preload("Group").
// 		Find(&eventshutt, entity.DB().Where("id = ?", idevent)).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": eventshutt})
// }

// func ListEventshuttbyid(c *gin.Context) {

// 	idevent := c.Param("eventid")

// 	var eventshutt entity.EventShutt
// 	if err := entity.DB().Model(&entity.EventShutt{}).
// 		Preload("EventGroupMember.EventGroupMemberShuttlecock.ShuttleCock").
// 		Preload("EventGroupMember.EventGroupMemberShuttlecock.ShuttleCock.Member").
// 		Preload("EventGroupMember.EventGroupMemberShuttlecock.ShuttleCock.Member.UserDetail").
// 		Preload("EventGroupMember.EventGroupMemberShuttlecock.EventGroupMember.GroupMember.Member").
// 		Preload("EventGroupMember.EventGroupMemberShuttlecock.EventGroupMember.GroupMember.Member.UserDetail").
// 		Preload("EventGroupMember.EventShutt").
// 		Preload("Group").
// 		Find(&eventshutt, entity.DB().Where("id = ?", idevent)).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": eventshutt})
// }

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
