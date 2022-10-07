package entity

import "gorm.io/gorm"

type UserRole struct {
	gorm.Model
	RoleName   string
	RoleNameTH string

	UserLogins []UserLogin `gorm:"foreignKey:UserRoleID"`
}

type UserLogin struct {
	gorm.Model
	Username string `gorm:"uniqueIndex"`
	Password string

	UserRoleID *uint    `gorm:"NOT NULL"`
	UserRole   UserRole `gorm:"references:ID; NOT NULL"`
}

type UserDetail struct {
	gorm.Model

	// Code 	string `gorm:"uniqueIndex"`
	FirstName   string
	LastName    string
	Nickname    string
	PhoneNumber string
	PromtPay    string
	PriceShutt  float64
}

type Member struct {
	gorm.Model

	UserLoginID *uint     `gorm:"uniqueIndex"`
	UserLogin   UserLogin `gorm:"references:ID; constraint:OnDelete:CASCADE"`

	UserDetailID *uint
	UserDetail   UserDetail `gorm:"references:ID"`

	// Groups []Group `gorm:"many2many:group_members"`
	// JoinGroup []JoinGroup `gorm:"foreignKey:MemberID"`
	ShuttleCock []ShuttleCock `gorm:"foreignKey:MemberID"`
	GroupMember []GroupMember `gorm:"foreignKey:MemberID"`
}
