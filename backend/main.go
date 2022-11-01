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
			protected.GET("/listevent/membernotingroup/:event", controller.ListMemberNotInEventShuttleCock)
			protected.GET("/eventmember/:eventid", controller.EventMember)
			protected.GET("/ownershutt/:eventid/:memberid/:price", controller.ListOwnerShutt)
			protected.GET("/summarizeevent/:eventid", controller.ListEventshuttbyid)
			protected.GET("/summarizegroupmembershuttlecockevent/:eventid", controller.ListEventmembershuttgroupbyid)
			protected.GET("/summarizegroupownershuttlecockevent/:eventid", controller.ListEventownershuttgroupbyid)
			protected.GET("/sum/groupmember/:groupid", controller.Summaryeventgroupbyid)
			protected.GET("/sum/eventshutt/:eventid", controller.Summaryeventbyid)
			protected.GET("/groupeventshutt/:group", controller.ListEventmembershuttbyidgroup)

			protected.PATCH("/updateaccount", controller.UpdateAccount)
			protected.PATCH("/listevent/membernotingroup/:event", controller.UpdateMemberIntoEvent)

			protected.POST("/joingroup", controller.JoinGroup)
			protected.POST("/event", controller.CreateEventShuttleCock)
			protected.POST("/creategroup", controller.CreateGroup)
			protected.POST("/addshutt", controller.AddShuttleCock)
			protected.POST("/summary", controller.Summary)

			protected.DELETE("/deleteevent/:id", controller.DeleteEventinGroup)
			protected.DELETE("/deleteaddshutttlecock/:id", controller.DeleteAddshutt)

			// protected.POST("/event",controller.CreateEventShuttleCock)
		}
	}
	r.GET("/role", controller.GetRole)
	r.POST("/register", controller.Register)
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}
