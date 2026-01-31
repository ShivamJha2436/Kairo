package workflow

import "time"

type Workflow struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Step struct {
	ID         string `json:"id"`
	WorkflowID string `json:"workflow_id"`
	OrderIndex int    `json:"order_index"`
	Name       string `json:"name"`
	Action     string `json:"action"` // e.g. "http", "custom"
	Config     string `json:"config"` // JSON config for the step
}

type Execution struct {
	ID         string    `json:"id"`
	WorkflowID string    `json:"workflow_id"`
	Status     string    `json:"status"` // pending, running, completed, failed
	CurrentStep int      `json:"current_step"`
	StartedAt  *time.Time `json:"started_at,omitempty"`
	FinishedAt *time.Time `json:"finished_at,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
}
