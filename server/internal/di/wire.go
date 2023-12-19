//go:build wireinject
// +build wireinject

package di

import (
	"github.com/google/wire"
	"github.com/mrgsrylm/messenger/server/config"
	"github.com/mrgsrylm/messenger/server/internal/database"
	"github.com/mrgsrylm/messenger/server/internal/handler"
	"github.com/mrgsrylm/messenger/server/internal/middleware"
	"github.com/mrgsrylm/messenger/server/internal/repository"
	"github.com/mrgsrylm/messenger/server/internal/server"
	"github.com/mrgsrylm/messenger/server/internal/socket"
	"github.com/mrgsrylm/messenger/server/internal/usecase"
	"github.com/mrgsrylm/messenger/server/pkg/google"
	"github.com/mrgsrylm/messenger/server/pkg/token"
)

func InitializeAPI(cfg config.Config) (*server.Serve, error) {

	wire.Build(
		database.ConnectDatabase,

		token.NewTokenService,
		google.NewGoogleAuth,
		middleware.NewMiddleware,

		repository.NewUserRepository,
		repository.NewAuthRepository,
		repository.NewChatRepository,

		usecase.NewAuthUseCase,
		usecase.NewChatUseCase,
		usecase.NewUserUseCase,

		socket.NewWebSocketService,
		handler.NewAuthHandler,
		handler.NewChatHandler,
		handler.NewUserHandler,

		server.NewServerHTTP,
	)

	return &server.Serve{}, nil
}
