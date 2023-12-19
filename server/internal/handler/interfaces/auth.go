package interfaces

import "github.com/gin-gonic/gin"

type AuthHandler interface {
	UserLogin(ctx *gin.Context)
	UserGoogleLogin(ctx *gin.Context)
	UserSignUp(ctx *gin.Context)

	UserRenewAccessToken() gin.HandlerFunc
}
