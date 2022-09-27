package main

import (
	"github.com/Sakeezt/Badminton/backend/controller"
	"github.com/Sakeezt/Badminton/backend/entity"
	"github.com/Sakeezt/Badminton/backend/middlewares"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			protected.GET("/userdetail", controller.ListDetail)
			protected.GET("/group/:id", controller.GetGroup)

			protected.GET("/shuttlecock", controller.GetShutt)
			protected.GET("/memberingroup/:id", controller.GetjoinGroup)
			protected.GET("/groupmember/:groupid", controller.GetGroupMember)
			protected.GET("/group/player/:id", controller.GetGroupByPlayer)

			protected.GET("/listevent/:group", controller.ListEventShuttleCock)
			protected.GET("/eventmember/:eventid", controller.EventMember)

			protected.PATCH("/updateaccount/:id", controller.UpdateAccount)
			protected.POST("/joingroup", controller.JoinGroup)
			protected.POST("/event", controller.CreateEventShuttleCock)
			protected.POST("/creategroup", controller.CreateGroup)
			// protected.POST("/event",controller.CreateEventShuttleCock)
		}
	}

	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}
