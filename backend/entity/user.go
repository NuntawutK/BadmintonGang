package entity

import (
	"gorm.io/gorm"
)

type UserRole struct {
	gorm.Model
	RoleName   string
	RoleNameTH string

	UserLogins []UserLogin `gorm:"foreignKey:UserRoleID"`
}

type UserLogin struct {
	gorm.Model
	Username string `gorm:"uniqueIndex" valid:"required~please enter username,minstringlength(5)~Username must not be less than 5 characters,matches([alpha])~Username must contain lowercase character and numbers"`
	Password string `valid:"required~please enter password,minstringlength(8)~Password must not be less than 8 characters"`

	UserRoleID *uint    `gorm:"NOT NULL"`
	UserRole   UserRole `gorm:"references:ID; NOT NULL" valid:"-"`

	// Register []Register `gorm:"foreignKey:UserLoginID"`
}

type UserDetail struct {
	gorm.Model

	FirstName   string `valid:"required~please enter FirstName"`
	LastName    string `valid:"required~please enter LastName"`
	Nickname    string `valid:"required~please enter Nickname"`
	PhoneNumber string `valid:"required,matches(^[0]\\d{9}$)~PhoneNumber must be contain 10 numbers"`
	PromtPay    string `valid:"required,matches(^[0]\\d{9}$)~PromtPay must be contain 10 numbers"`
	Qrcode      string
}

type Member struct {
	gorm.Model

	UserLoginID *uint     `gorm:"uniqueIndex"`
	UserLogin   UserLogin `gorm:"references:ID; constraint:OnDelete:CASCADE"`

	UserDetailID *uint
	UserDetail   UserDetail `gorm:"references:ID"`

	ShuttleCock []ShuttleCock `gorm:"foreignKey:MemberID"`
	GroupMember []GroupMember `gorm:"foreignKey:MemberID"`
}
