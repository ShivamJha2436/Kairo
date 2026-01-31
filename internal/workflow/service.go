package workflow

import (
	"context"
	"fmt"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Trigger(ctx context.Context, workflowName string) (executionID string, err error) {
	w, err := s.repo.GetWorkflowByName(ctx, workflowName)
	if err != nil {
		return "", fmt.Errorf("workflow not found: %w", err)
	}
	return s.repo.CreateExecution(ctx, w.ID)
}

func (s *Service) GetWorkflow(ctx context.Context, name string) (*Workflow, error) {
	return s.repo.GetWorkflowByName(ctx, name)
}

func (s *Service) GetSteps(ctx context.Context, workflowID string) ([]Step, error) {
	return s.repo.ListStepsByWorkflowID(ctx, workflowID)
}

func (s *Service) GetExecution(ctx context.Context, id string) (*Execution, error) {
	return s.repo.GetExecution(ctx, id)
}

func (s *Service) ListWorkflows(ctx context.Context) ([]Workflow, error) {
	return s.repo.ListWorkflows(ctx)
}

func (s *Service) ListExecutions(ctx context.Context, workflowID string, limit int) ([]Execution, error) {
	return s.repo.ListExecutions(ctx, workflowID, limit)
}
