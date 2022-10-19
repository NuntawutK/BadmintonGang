package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Group struct {
	gorm.Model

	CreatedMemberID *uint
	CreatedMember   Member `gorm:"references:ID" valid:"-"`

	NameGroup string `valid:"required~please enter name group"`
	CodeGroup string `gorm:"uniqueIndex"`

	EventShutt  []EventShutt  `gorm:"foreignKey:GroupID"`
	GroupMember []GroupMember `gorm:"foreignKey:GroupID"`

	// Members []Member `gorm:"many2many:group_members"`
	// JoinGroup  []JoinGroup  `gorm:"foreignKey:GroupID"`
}

type GroupMember struct {
	gorm.Model

	// ID uint	`gorm:"primaryKey; autoIncrement"`

	MemberID uint
	Member   Member `gorm:"references:ID" valid:"-"`

	GroupID uint
	Group   Group `gorm:"references:ID" valid:"-"`

	EventGroupMember []EventGroupMember `gorm:"foreignKey:GroupMemberID"`

	// EventShutt []EventShutt `gorm:"foreignKey:JoinGroupID"`
	// EventShutts []EventShutt `gorm:"many2many:join_event; references:ID"`
}
type ShuttleCock struct {
	gorm.Model

	Code string `gorm:"uniqueIndex"`

	EventShuttID *uint
	EventShutt   EventShutt `gorm:"references:ID" valid:"-"`

	MemberID *uint
	Member   Member `gorm:"references:ID" valid:"-"`

	EventGroupMemberShuttlecock []EventGroupMemberShuttlecock `gorm:"foreignKey:ShuttleCockID"`
}

type EventShutt struct {
	gorm.Model

	GroupID *uint
	Group   Group `gorm:"references:ID" valid:"-"`

	Place     string    `valid:"required"`
	TimeStart time.Time `valid:"notpast~TimeStart must not be in the past"`
	TimeStop  time.Time `valid:"notpast~TimeStop must not be in the past"`
	//`valid:"notpast~TimeStop must not be in the past"`

	EventGroupMember []EventGroupMember `gorm:"foreignKey:EventShuttID"`
	ShuttleCock      []ShuttleCock      `gorm:"foreignKey:EventShuttID"`
	Summary          []Summary          `gorm:"foreignKey:EventShuttID"`
}

type EventGroupMember struct {
	gorm.Model

	GroupMemberID *uint
	GroupMember   GroupMember `gorm:"references:ID" valid:"-"`

	EventShuttID *uint
	EventShutt   EventShutt `gorm:"references:ID" valid:"-"`

	EventGroupMemberShuttlecock []EventGroupMemberShuttlecock `gorm:"foreignKey:EventGroupMemberID"`
}

type EventGroupMemberShuttlecock struct {
	gorm.Model

	ShuttleCockID *uint
	ShuttleCock   ShuttleCock `gorm:"references:ID" valid:"-"`

	EventGroupMemberID *uint
	EventGroupMember   EventGroupMember `gorm:"references:ID" valid:"-"`

	// MemberID *uint
	// Member   Member `gorm:"references:ID" valid:"-"`
}

type Summary struct {
	gorm.Model

	EventShuttID *uint
	EventShutt   EventShutt `gorm:"references:ID" valid:"-"`

	// Status     string
	TotalPrice int
}

func init() {
	govalidator.CustomTypeTagMap.Set("notpast", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// ย้อนหลังไม่เกิน 1 วัน
		return t.After(time.Now().AddDate(0, 0, -1))
	})
}
