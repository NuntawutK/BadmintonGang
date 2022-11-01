package controller

import (
	"fmt"
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
	username, _ := c.Get("username")

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
	var eventgroupmember entity.EventGroupMember
	if tx := entity.DB().Raw("SELECT * FROM event_group_members WHERE event_shutt_id = ?", eventshutt.ID).Find(&eventgroupmember); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	var user entity.UserLogin
	if tx := entity.DB().Raw("SELECT * FROM user_logins WHERE username = ?", username).Find(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	var member entity.Member
	if tx := entity.DB().Preload("UserDetail").
		Raw("SELECT * FROM members WHERE user_login_id = ?", user.ID).Find(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	type Group struct {
		Name     string  `json:"name"`
		Lastname string  `json:"lastname"`
		Nickname string  `json:"nickname"`
		MemberID uint    `json:"memberid"`
		Quantity int     `json:"quantity"`
		Price    float64 `json:"price"`
		Qrcode   string  `json:"qrcode"`
		PromtPay string  `json:"pp"`
	}

	data := []Group{}
	quan := 1
	for _, itemA := range eventshutt.EventGroupMember {
		if itemA.GroupMember.Member.ID != member.ID {
			continue
		} else {
			for _, item1 := range eventshutt.ShuttleCock {
				for _, item2 := range item1.EventGroupMemberShuttlecock {
					if item2.EventGroupMember.GroupMember.Member.ID == member.ID {
						check := false
						for i := 0; i < len(data); i++ {
							if data[i].MemberID == *item1.MemberID {
								data[i].Price += ((float64(item1.Price)) / (float64(len(item1.EventGroupMemberShuttlecock))))
								data[i].Quantity += 1
								check = true
								fmt.Println(quan)
							}

						}
						if !check {
							group := Group{MemberID: *item1.MemberID, Name: item1.Member.UserDetail.FirstName, Lastname: item1.Member.UserDetail.LastName, Nickname: item1.Member.UserDetail.Nickname, Quantity: 1, Price: ((float64(item1.Price)) / (float64(len(item1.EventGroupMemberShuttlecock)))), Qrcode: item1.Member.UserDetail.Qrcode, PromtPay: item1.Member.UserDetail.PromtPay}
							data = append(data, group)
						}
					}

				}

			}

		}

	}

	c.JSON(http.StatusOK, gin.H{"data": data})
}
