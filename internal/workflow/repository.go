package workflow

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *Repository {
	return &Repository{pool: pool}
}

func (r *Repository) GetWorkflowByName(ctx context.Context, name string) (*Workflow, error) {
	var w Workflow
	err := r.pool.QueryRow(ctx,
		`SELECT id, name, created_at, updated_at FROM workflows WHERE name = $1`, name,
	).Scan(&w.ID, &w.Name, &w.CreatedAt, &w.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &w, nil
}

func (r *Repository) ListStepsByWorkflowID(ctx context.Context, workflowID string) ([]Step, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT id, workflow_id, order_index, name, action, config FROM steps WHERE workflow_id = $1 ORDER BY order_index`,
		workflowID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var steps []Step
	for rows.Next() {
		var s Step
		if err := rows.Scan(&s.ID, &s.WorkflowID, &s.OrderIndex, &s.Name, &s.Action, &s.Config); err != nil {
			return nil, err
		}
		steps = append(steps, s)
	}
	return steps, rows.Err()
}

func (r *Repository) CreateExecution(ctx context.Context, workflowID string) (string, error) {
	var id string
	err := r.pool.QueryRow(ctx,
		`INSERT INTO executions (workflow_id, status, current_step) VALUES ($1, 'pending', 0) RETURNING id`,
		workflowID,
	).Scan(&id)
	return id, err
}

func (r *Repository) GetExecution(ctx context.Context, id string) (*Execution, error) {
	var e Execution
	err := r.pool.QueryRow(ctx,
		`SELECT id, workflow_id, status, current_step, started_at, finished_at, created_at FROM executions WHERE id = $1`, id,
	).Scan(&e.ID, &e.WorkflowID, &e.Status, &e.CurrentStep, &e.StartedAt, &e.FinishedAt, &e.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &e, nil
}

func (r *Repository) UpdateExecution(ctx context.Context, id, status string, currentStep int, startedAt, finishedAt interface{}) error {
	_, err := r.pool.Exec(ctx,
		`UPDATE executions SET status = $1, current_step = $2, started_at = COALESCE($3, started_at), finished_at = COALESCE($4, finished_at) WHERE id = $5`,
		status, currentStep, startedAt, finishedAt, id,
	)
	return err
}

func (r *Repository) ListWorkflows(ctx context.Context) ([]Workflow, error) {
	rows, err := r.pool.Query(ctx, `SELECT id, name, created_at, updated_at FROM workflows ORDER BY name`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var list []Workflow
	for rows.Next() {
		var w Workflow
		if err := rows.Scan(&w.ID, &w.Name, &w.CreatedAt, &w.UpdatedAt); err != nil {
			return nil, err
		}
		list = append(list, w)
	}
	return list, rows.Err()
}

func (r *Repository) ListExecutions(ctx context.Context, workflowID string, limit int) ([]Execution, error) {
	if limit <= 0 {
		limit = 50
	}
	rows, err := r.pool.Query(ctx,
		`SELECT id, workflow_id, status, current_step, started_at, finished_at, created_at FROM executions WHERE workflow_id = $1 ORDER BY created_at DESC LIMIT $2`,
		workflowID, limit,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var list []Execution
	for rows.Next() {
		var e Execution
		if err := rows.Scan(&e.ID, &e.WorkflowID, &e.Status, &e.CurrentStep, &e.StartedAt, &e.FinishedAt, &e.CreatedAt); err != nil {
			return nil, err
		}
		list = append(list, e)
	}
	return list, rows.Err()
}
