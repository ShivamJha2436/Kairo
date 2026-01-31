package execution

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/kairo/kairo/internal/workflow"
)

type Engine struct{}

func NewEngine() *Engine {
	return &Engine{}
}

// ExecuteStep runs a single step (e.g. HTTP call) and returns error if failed.
func (e *Engine) ExecuteStep(ctx context.Context, step workflow.Step) error {
	switch step.Action {
	case "http":
		return e.executeHTTP(ctx, step.Config)
	default:
		return fmt.Errorf("unsupported action: %s", step.Action)
	}
}

func (e *Engine) executeHTTP(ctx context.Context, configJSON string) error {
	var cfg struct {
		URL    string `json:"url"`
		Method string `json:"method"`
	}
	if err := json.Unmarshal([]byte(configJSON), &cfg); err != nil {
		return fmt.Errorf("parse http config: %w", err)
	}
	if cfg.URL == "" {
		return fmt.Errorf("http step missing url")
	}
	if cfg.Method == "" {
		cfg.Method = http.MethodGet
	}
	req, err := http.NewRequestWithContext(ctx, cfg.Method, cfg.URL, nil)
	if err != nil {
		return err
	}
	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 400 {
		return fmt.Errorf("http status %d", resp.StatusCode)
	}
	return nil
}
