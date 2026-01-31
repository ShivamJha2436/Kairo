package server

import (
	"context"
	"fmt"
	"net/http"

	"github.com/kairo/kairo/internal/config"
	"github.com/kairo/kairo/internal/logger"
	"github.com/kairo/kairo/internal/workflow"
)

type Server struct {
	cfg     *config.Config
	log     *logger.Logger
	handlers *workflow.Handler
	http    *http.Server
}

func New(cfg *config.Config, log *logger.Logger, handlers *workflow.Handler) *Server {
	mux := http.NewServeMux()

	// Trigger workflow by name: POST /triggers/:name
	mux.HandleFunc("POST /triggers/{name}", handlers.Trigger)
	mux.HandleFunc("GET /workflows", handlers.ListWorkflows)
	mux.HandleFunc("GET /executions/{id}", handlers.GetExecution)
	mux.HandleFunc("GET /executions", handlers.ListExecutions)

	handler := Middleware(log, mux)
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.Port),
		Handler: handler,
	}
	return &Server{cfg: cfg, log: log, handlers: handlers, http: srv}
}

func (s *Server) Listen() error {
	s.log.Info(context.Background(), "server listening", "port", s.cfg.Port)
	return s.http.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
	return s.http.Shutdown(ctx)
}
