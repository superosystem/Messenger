// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package di

import (
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

// Injectors from wire.go:

func InitializeAPI(cfg config.Config) (*server.Serve, error) {
	db, err := database.ConnectDatabase(cfg)
	if err != nil {
		return nil, err
	}
	authRepository := repository.NewAuthRepository(db)
	tokenService := token.NewTokenService(cfg)
	googleAuth := google.NewGoogleAuth(cfg)
	userRepository := repository.NewUserRepository(db)
	authUseCase := usecase.NewAuthUseCase(authRepository, tokenService, googleAuth, userRepository)
	authHandler := handler.NewAuthHandler(authUseCase)
	middlewareMiddleware := middleware.NewMiddleware(tokenService)
	userUseCase := usecase.NewUserUseCase(userRepository)
	userHandler := handler.NewUserHandler(userUseCase)
	chatRepository := repository.NewChatRepository(db)
	chatUseCase := usecase.NewChatUseCase(chatRepository)
	chatHandler := handler.NewChatHandler(chatUseCase)
	webSocketService := socket.NewWebSocketService(tokenService)
	serve := server.NewServerHTTP(cfg, authHandler, middlewareMiddleware, userHandler, chatHandler, webSocketService)
	return serve, nil
}
