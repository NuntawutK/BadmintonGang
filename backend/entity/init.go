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
		RoleName:   "Member",
		RoleNameTH: "สมาชิก",
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
		
		FirstName:  "สหรัฐ",
		LastName:	"จันทรินทร์",
		Nickname:   "ซากีส",
		PhoneNumber:"098xxxxxxx",
		PromtPay: "098xxxxxxx",
		PriceShutt: 20,

	}
	db.Model(&UserDetail{}).Create(&userDetail1)

	userDetail2 := UserDetail{
		
		FirstName:  "Saharat",
		LastName:	"Juntarin",
		Nickname:   "sakeezt",
		PhoneNumber:"098xxxxxxx",
		PromtPay: "098xxxxxxx",
		PriceShutt: 25,

	}
	db.Model(&UserDetail{}).Create(&userDetail2)

	userDetail3 := UserDetail{
		
		FirstName:  "Test",
		LastName:	"Testex",
		Nickname:   "sakeeztt",
		PhoneNumber:"068xxxxxxx",
		PromtPay: "067xxxxxxx",
		PriceShutt: 30,

	}
	db.Model(&UserDetail{}).Create(&userDetail3)



	// Member
	membersakeezt1:= Member{
		UserLogin:  login1,
		UserDetail: userDetail1,
	}
	db.Model(&Member{}).Create(&membersakeezt1)


	membersakeezt2:= Member{
		UserLogin:  login2,
		UserDetail: userDetail2,
	}
	db.Model(&Member{}).Create(&membersakeezt2)


	membersakeezt3:= Member{
		UserLogin:  login3,
		UserDetail: userDetail3,
	}
	db.Model(&Member{}).Create(&membersakeezt3)



	// //Group
	// group1 := Group{
	// 	Member: membersakeezt1,
	// 	CodeGroup: "ABCD52",
	// 	NameGroup: "Example1",
	// }
	// db.Model(&Group{}).Create(&group1)

	// //Join Group
	// joingroup1 := JoinGroup{
	// 	Member: membersakeezt2,
	// 	Group : group1,
	// }
	// db.Model(&JoinGroup{}).Create(&joingroup1)

	// //Join Group
	// joingroup2 := JoinGroup{
	// 	Member: membersakeezt3,
	// 	Group : group1,
	// }
	// db.Model(&JoinGroup{}).Create(&joingroup1)



}