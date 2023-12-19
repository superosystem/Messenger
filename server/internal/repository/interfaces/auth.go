package interfaces

import (
	"context"

	"github.com/mrgsrylm/messenger/server/internal/domain"
)

type AuthRepository interface {
	SaveRefreshSession(ctx context.Context, refreshSession domain.RefreshSession) error
	FindRefreshSessionByTokenID(ctx context.Context, tokenID string) (domain.RefreshSession, error)
}
