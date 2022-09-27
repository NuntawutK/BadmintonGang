package entity

import (
	"time"

	"gorm.io/gorm"
)

type Group struct {
	gorm.Model

	CreatedMemberID *uint
	CreatedMember   Member `gorm:"references:ID"`

	NameGroup string
	CodeGroup string `gorm:"uniqueIndex"`

	GroupMember []GroupMember `gorm:"foreignKey:GroupID"`

	// Members []Member `gorm:"many2many:group_members"`
	// JoinGroup  []JoinGroup  `gorm:"foreignKey:GroupID"`
}

type ShuttleCock struct {
	gorm.Model

	Code string

	EventShutt []EventShutt `gorm:"foreignKey:ShuttleCockID"`
}

type GroupMember struct {
	gorm.Model

	// ID uint	`gorm:"primaryKey; autoIncrement"`

	MemberID uint
	Member   Member `gorm:"references:ID"`

	GroupID uint
	Group   Group `gorm:"references:ID"`

	EventGroupMember []EventGroupMember `gorm:"foreignKey:GroupMemberID"`

	// EventShutt []EventShutt `gorm:"foreignKey:JoinGroupID"`
	// EventShutts []EventShutt `gorm:"many2many:join_event; references:ID"`
}

type EventShutt struct {
	gorm.Model

	// JoinGroupID *uint
	// JoinGroup JoinGroup `gorm:"references:ID"`

	ShuttleCockID *uint
	ShuttleCock   ShuttleCock `gorm:"references:ID"`

	Place     string
	TimeStart time.Time
	TimeStop  time.Time

	EventGroupMember []EventGroupMember `gorm:"foreignKey:EventShuttID"`
	// GroupMembers     []GroupMember      `gorm:"foreignKey:EventShuttID"`

	// GroupMembers []GroupMember `gorm:"many2many:join_event; references:ID"`
}

type EventGroupMember struct {
	gorm.Model

	GroupMemberID *uint
	GroupMember   GroupMember `gorm:"references:ID"`

	EventShuttID *uint
	EventShutt   EventShutt `gorm:"references:ID"`
}
