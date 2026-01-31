package server

import (
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/kairo/kairo/internal/logger"
)

func Middleware(log *logger.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		requestID := r.Header.Get("X-Request-ID")
		if requestID == "" {
			requestID = uuid.New().String()
		}
		w.Header().Set("X-Request-ID", requestID)
		ctx := r.Context()
		log.Info(ctx, "request",
			"request_id", requestID,
			"method", r.Method,
			"path", r.URL.Path,
			"remote", r.RemoteAddr,
		)
		next.ServeHTTP(w, r.WithContext(ctx))
		log.Info(ctx, "request completed",
			"request_id", requestID,
			"duration_ms", time.Since(start).Milliseconds(),
		)
	})
}
