package worker

import (
	"context"
	"time"

	"github.com/kairo/kairo/internal/execution"
	"github.com/kairo/kairo/internal/logger"
	"github.com/kairo/kairo/internal/workflow"
)

type Worker struct {
	repo    *workflow.Repository
	engine  *execution.Engine
	log     *logger.Logger
	pollSec int
}

func New(repo *workflow.Repository, log *logger.Logger) *Worker {
	return &Worker{
		repo:    repo,
		engine:  execution.NewEngine(),
		log:     log,
		pollSec: 5,
	}
}

func (w *Worker) Run(ctx context.Context) {
	ticker := time.NewTicker(time.Duration(w.pollSec) * time.Second)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			w.processPending(ctx)
		}
	}
}

func (w *Worker) processPending(ctx context.Context) {
	// In v0.1.0 we could poll executions with status=pending and run their steps.
	// For minimal scope, this is a stub that would:
	// 1. List executions where status = 'pending'
	// 2. For each, load workflow steps, run current step, update execution state.
	_ = w.repo
	_ = w.engine
	w.log.Debug(ctx, "worker poll (stub)")
}
