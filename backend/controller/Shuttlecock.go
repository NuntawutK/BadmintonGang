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

}

func DeleteAddshutt(c *gin.Context) {
	id := c.Param("id")

	var data entity.ShuttleCock

	// var eventgroupmembershutt entity.EventGroupMemberShuttlecock
	// if err := entity.DB().Model(&entity.EventGroupMemberShuttlecock{}).
	// 	First(&eventgroupmembershutt, entity.DB().Where("shuttle_cock_id = ?", id)).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	entity.DB().Unscoped().
		Where("shuttle_cock_id = ?", id).
		Delete(&entity.EventGroupMemberShuttlecock{})

	sql := "DELETE FROM shuttle_cocks WHERE id = ?"
	entity.DB().Model(&entity.EventShutt{}).Raw(sql, id).Scan(&data)

	c.JSON(http.StatusOK, gin.H{"data": data})
}
