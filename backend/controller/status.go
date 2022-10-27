package controller

import (
	"fmt"
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/gin-gonic/gin"
)

func Statuseventbyid(c *gin.Context) {

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

	fmt.Println(username)
	// fmt.Println(len(eventshutt.ShuttleCock))

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

	// fmt.Println(member.UserDetail.FirstName)
	type Status struct {
		Name     string  `json:"name"`
		Quantity int     `json:"quantity"`
		Price    float64 `json:"price"`
	}

	data := []Status{}
	quan := 1
	for _, item1 := range eventshutt.ShuttleCock {
			for _, item2 := range item1.EventGroupMemberShuttlecock {
				if item2.EventGroupMember.GroupMember.Member.UserDetail.FirstName == member.UserDetail.FirstName {
					if item1.Member.UserDetail.FirstName == member.UserDetail.FirstName {

					check := false
					for i := 0; i < len(data); i++ {
						// fmt.Println("--", data[i].Name)
						if data[i].Name == item2.EventGroupMember.GroupMember.Member.UserDetail.FirstName {
							data[i].Price += ((item1.Member.UserDetail.PriceShutt) / (float64(len(item1.EventGroupMemberShuttlecock))))
							data[i].Quantity += 1
							check = true
							fmt.Println(quan)
						}

					}
					if !check {
						status := Status{Name: item1.Member.UserDetail.FirstName, Quantity: 1, Price: ((item1.Member.UserDetail.PriceShutt) / (float64(len(item1.EventGroupMemberShuttlecock))))}
						data = append(data, status)
					}
				}
				}
			}
			fmt.Println(data)

		

	}

	c.JSON(http.StatusOK, gin.H{"data": data})

}
