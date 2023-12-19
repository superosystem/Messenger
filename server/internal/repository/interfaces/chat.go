package interfaces

import (
	"context"

	"github.com/mrgsrylm/messenger/server/internal/domain"
	"github.com/mrgsrylm/messenger/server/internal/handler/request"
	"github.com/mrgsrylm/messenger/server/internal/handler/response"
)

type ChatRepository interface {
	SaveChat(ctx context.Context, user1ID, user2ID uint) (chatID uint, err error)
	SaveMessage(ctx context.Context, message domain.Message) error
	FindAllRecentChatsOfUser(ctx context.Context, userID uint, pagination request.Pagination) ([]response.Chat, error)
	FindAllMessagesByChatAndUserID(ctx context.Context, chatID, userID uint, pagination request.Pagination) ([]response.Message, error)
	FindChatIDByUser1AndUser2ID(ctx context.Context, user1ID, user2ID uint) (chatID uint, err error)
	FindReceiverOfChatBySenderID(ctx context.Context, chatID, senderID uint) (receiverID uint, err error)
}
