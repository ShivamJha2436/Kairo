package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/kairo/kairo/internal/config"
	"github.com/kairo/kairo/internal/db"
	"github.com/kairo/kairo/internal/logger"
	"github.com/kairo/kairo/internal/server"
	"github.com/kairo/kairo/internal/workflow"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		panic("load config: " + err.Error())
	}

	log := logger.New(cfg.LogLevel)
	ctx := context.Background()

	if err := db.Migrate(cfg.DatabaseURL); err != nil {
		log.Error(ctx, "migrate failed", "error", err)
		os.Exit(1)
	}

	pool, err := db.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Error(ctx, "db connect failed", "error", err)
		os.Exit(1)
	}
	defer pool.Close()

	workflowRepo := workflow.NewRepository(pool)
	workflowSvc := workflow.NewService(workflowRepo)
	workflowHandlers := workflow.NewHandler(workflowSvc, log)

	srv := server.New(cfg, log, workflowHandlers)
	go func() {
		if err := srv.Listen(); err != nil {
			log.Error(ctx, "server error", "error", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Info(ctx, "shutting down")
	srv.Shutdown(ctx)
}
