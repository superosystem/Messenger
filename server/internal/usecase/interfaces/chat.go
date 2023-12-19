package interfaces

import (
	"context"

	"github.com/mrgsrylm/messenger/server/internal/domain"
	"github.com/mrgsrylm/messenger/server/internal/handler/request"
	"github.com/mrgsrylm/messenger/server/internal/handler/response"
)

type ChatUseCase interface {
	FindAllRecentChatsOfUser(ctx context.Context, userID uint, pagination request.Pagination) ([]response.Chat, error)
	SaveChat(ctx context.Context, user1ID, user2ID uint) (chatID uint, err error)
	FindAllMessagesOfUserForAChat(ctx context.Context, chatID, userID uint, pagination request.Pagination) ([]response.Message, error)

	SaveMessage(ctx context.Context, message domain.Message) (receiverID uint, err error)
}
