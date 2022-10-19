package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

//Get Group
func GetGroup(c *gin.Context) {
	id := c.Param("id")
	var group entity.Group
	if err := entity.DB().Raw("SELECT * FROM groups WHERE id = ?", id).Find(&group).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": group})
}

func GetjoinGroup(c *gin.Context) {
	id := c.Param("id")
	var joingroup []entity.GroupMember

	if err := entity.DB().Preload("Group").Preload("Member").Preload("Member.UserDetail").Raw("SELECT * FROM group_members WHERE member_id = ?", id).Find(&joingroup).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": joingroup})
}

func GetGroupMember(c *gin.Context) {
	id := c.Param("groupid")
	var groupMember []entity.GroupMember

	if err := entity.DB().Preload("Group").Preload("Member").Preload("Member.UserDetail").Raw("SELECT * FROM group_members WHERE group_id = ?", id).
		Find(&groupMember).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": groupMember})
}

// GET /group/player/:id
func GetGroupByPlayer(c *gin.Context) {
	id := c.Param("id")

	var member entity.Member
	if err := entity.DB().Preload("GroupMember.Group").Preload("GroupMember.Member").Preload("GroupMember.Member.UserDetail").
		Table("members").Where("id = ?", id).Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": member.GroupMember})
	// var groups []entity.Group

	// if err := entity.DB().Preload("GroupMember.Member", "member_id = ?", id).Preload("GroupMember.Member.UserDetail").
	// 	Table("groups").Find(&groups).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// c.JSON(http.StatusOK, gin.H{"data": groups})
}

// POST /Group
func CreateGroup(c *gin.Context) {

	var group entity.Group
	var createdMember entity.Member

	if err := c.ShouldBindJSON(&group); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", group.CreatedMemberID).First(&createdMember); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(group); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	createGroup := entity.Group{

		CreatedMember: createdMember,
		NameGroup:     group.NameGroup,
		CodeGroup:     group.CodeGroup,
		// คนสร้างกลุ่มต้องมีชื่อใน GroupMember ด้วย
		// Members: []entity.Member{createdMember},
	}

	//บันทึก
	if err := entity.DB().Create(&createGroup).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	joingroup := entity.GroupMember{
		Member: createdMember,
		Group:  createGroup,
	}

	if err := entity.DB().Create(&joingroup).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": joingroup})

}

// POST /Group
func JoinGroup(c *gin.Context) {

	var joingroup struct {
		CodeGroup string
		MemberID  uint
	}

	var group entity.Group
	var member entity.Member

	if err := c.ShouldBindJSON(&joingroup); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", joingroup.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	if tx := entity.DB().Where("code_group = ?", joingroup.CodeGroup).First(&group); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "group not found"})
		return
	}

	createGroupMember := entity.GroupMember{
		Member: member,
		Group:  group,
	}

	//บันทึก
	if err := entity.DB().Create(&createGroupMember).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": createGroupMember})
}
