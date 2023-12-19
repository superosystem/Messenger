package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mrgsrylm/messenger/server/internal/handler/interfaces"
	"github.com/mrgsrylm/messenger/server/internal/middleware"
	"github.com/mrgsrylm/messenger/server/internal/socket"
)

func SetupRoutes(api *gin.Engine, authHandler interfaces.AuthHandler,
	middleware middleware.Middleware, userHandler interfaces.UserHandler,
	chatHandler interfaces.ChatHandler, socketService socket.WebSocketService) {

	auth := api.Group("")
	{ // auth
		auth.POST(SignUpURL, authHandler.UserSignUp)
		auth.POST(SignInURL, authHandler.UserLogin)
		auth.POST(GoogleSignInURL, authHandler.UserGoogleLogin)
		auth.POST(RenewAccessTokenURL, authHandler.UserRenewAccessToken())
	}

	api.GET(SocketURL, socketService.ServeWebSocket)

	authorized := api.Group("", middleware.AuthenticateUser())

	{ // user
		authorized.GET(UsersURL, userHandler.ListAllUsers)
	}

	{ //chats

		authorized.GET(ChatsURL, chatHandler.GetRecentChats)
		authorized.POST(ChatsURL, chatHandler.SaveChat)

		authorized.GET(ChatsMessgeURL, chatHandler.GetAllMessages)
		authorized.POST(ChatsMessgeURL, chatHandler.SaveMessage)
	}
}
