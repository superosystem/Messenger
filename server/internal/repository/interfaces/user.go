package interfaces

import (
	"context"

	"github.com/mrgsrylm/messenger/server/internal/domain"
	"github.com/mrgsrylm/messenger/server/internal/handler/request"
	"github.com/mrgsrylm/messenger/server/internal/handler/response"
)

type UserRepository interface {
	SaveUser(ctx context.Context, user domain.User) (userID uint, err error)
	FindAllUsers(ctx context.Context, pagination request.Pagination) ([]response.User, error)
	FindUserByUserID(ctx context.Context, userID uint) (user domain.User, err error)
	FindUserByEmail(ctx context.Context, email string) (user domain.User, err error)
	FindUserByUserName(ctx context.Context, userName string) (user domain.User, err error)
	FindUserByUserNameEmailNotID(ctx context.Context, user domain.User) (domain.User, error)
}
