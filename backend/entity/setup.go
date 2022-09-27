package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("BatmintonProject.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// // Create join table
	// if err := database.SetupJoinTable(&Group{}, "Members", &GroupMember{}); err != nil {
	// 	panic("failed to setup join table")
	// }
	// if err := database.SetupJoinTable(&Member{}, "Groups", &GroupMember{}); err != nil {
	// 	panic("failed to setup join table")
	// }

	// Migrate the schema
	database.AutoMigrate(
		// User
		&UserRole{},
		&UserLogin{},

		&Member{},
		&UserDetail{},

		&Group{},
		&EventShutt{},
		&ShuttleCock{},
		&GroupMember{},
		&EventGroupMember{},
	)

	db = database

	SetupIntoDatabase(db)
}
