package server

import (
	"github.com/gin-gonic/gin"
	docs "github.com/mrgsrylm/messenger/server/cmd/api/docs"
	"github.com/mrgsrylm/messenger/server/config"
	"github.com/mrgsrylm/messenger/server/internal/handler/interfaces"
	"github.com/mrgsrylm/messenger/server/internal/middleware"
	"github.com/mrgsrylm/messenger/server/internal/routes"
	"github.com/mrgsrylm/messenger/server/internal/socket"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Serve struct {
	engine *gin.Engine
	port   string
}

func NewServerHTTP(cfg config.Config, authHandler interfaces.AuthHandler,
	middleware middleware.Middleware, userHandler interfaces.UserHandler,
	chatHandler interfaces.ChatHandler, socketService socket.WebSocketService) *Serve {

	engine := gin.New()

	engine.Use(middleware.Cors())
	engine.Use(gin.Logger())

	docs.SwaggerInfo.BasePath = routes.BaseURL
	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	routes.SetupRoutes(engine, authHandler, middleware, userHandler, chatHandler, socketService)

	return &Serve{
		engine: engine,
		port:   cfg.Port,
	}
}

func (c *Serve) Start() error {

	return c.engine.Run(c.port)
}
