package usecase

import (
	"context"

	"github.com/mrgsrylm/messenger/server/internal/handler/request"
	"github.com/mrgsrylm/messenger/server/internal/handler/response"
	repo "github.com/mrgsrylm/messenger/server/internal/repository/interfaces"
	"github.com/mrgsrylm/messenger/server/internal/usecase/interfaces"
	"github.com/mrgsrylm/messenger/server/pkg/utils"
)

type userUseCase struct {
	repo repo.UserRepository
}

func NewUserUseCase(repo repo.UserRepository) interfaces.UserUseCase {
	return &userUseCase{
		repo: repo,
	}
}

func (c *userUseCase) FindAllUsers(ctx context.Context, pagination request.Pagination) ([]response.User, error) {

	users, err := c.repo.FindAllUsers(ctx, pagination)
	if err != nil {
		return nil, utils.PrependMessageToError(err, "failed to get all users from database")
	}

	return users, nil
}
