package interfaces

import (
	"context"

	"github.com/mrgsrylm/messenger/server/internal/handler/request"
	"github.com/mrgsrylm/messenger/server/internal/handler/response"
)

type UserUseCase interface {
	FindAllUsers(ctx context.Context, pagination request.Pagination) ([]response.User, error)
}
