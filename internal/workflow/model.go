package workflow

import "time"

type Workflow struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Steps     []Step    `json:"steps"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Step struct {
	ID     string                 `json:"id"`
	Name   string                 `json:"name"`
	Type   string                 `json:"type"`
	Config map[string]interface{} `json:"config"`
	Order  int                    `json:"order"`
}

