package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

func SetupIntoDatabase(db *gorm.DB) {
	// +------------------------------+
	// |            USER              |
	// +------------------------------+
	// UserRole
	memberRole := UserRole{
		RoleName: "Member",
	}
	db.Model(&UserRole{}).Create(&memberRole)

	// UserLogin
	login1 := UserLogin{
		Username: "admin1",
		Password: SetupPasswordHash("admin1"),
		UserRole: memberRole,
	}
	db.Model(&UserLogin{}).Create(&login1)

	login2 := UserLogin{
		Username: "admin2",
		Password: SetupPasswordHash("admin2"),
		UserRole: memberRole,
	}
	db.Model(&UserLogin{}).Create(&login2)

	login3 := UserLogin{
		Username: "admin3",
		Password: SetupPasswordHash("admin3"),
		UserRole: memberRole,
	}
	db.Model(&UserLogin{}).Create(&login3)

	//userDetail
	userDetail1 := UserDetail{

		FirstName:   "นาย A",
		LastName:    "A",
		Nickname:    "Ant",
		PhoneNumber: "0981234558",
		PromtPay:    "0981234558",
		PriceShutt:  20,
	}
	db.Model(&UserDetail{}).Create(&userDetail1)

	userDetail2 := UserDetail{

		FirstName:   "นาย B",
		LastName:    "B",
		Nickname:    "Bird",
		PhoneNumber: "0955555558",
		PromtPay:    "0955555558",
		PriceShutt:  25,
	}
	db.Model(&UserDetail{}).Create(&userDetail2)

	userDetail3 := UserDetail{

		FirstName:   "นาย C",
		LastName:    "C",
		Nickname:    "Cat",
		PhoneNumber: "0948484848",
		PromtPay:    "0948484848",
		PriceShutt:  30,
	}
	db.Model(&UserDetail{}).Create(&userDetail3)

	// Member
	membersakeezt1 := Member{
		UserLogin:  login1,
		UserDetail: userDetail1,
	}
	db.Model(&Member{}).Create(&membersakeezt1)

	membersakeezt2 := Member{
		UserLogin:  login2,
		UserDetail: userDetail2,
	}
	db.Model(&Member{}).Create(&membersakeezt2)

	membersakeezt3 := Member{
		UserLogin:  login3,
		UserDetail: userDetail3,
	}
	db.Model(&Member{}).Create(&membersakeezt3)

}
