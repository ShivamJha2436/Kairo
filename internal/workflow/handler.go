package workflow

import (
	"encoding/json"
	"net/http"

	"github.com/kairo/kairo/internal/logger"
)

type Handler struct {
	svc  *Service
	log  *logger.Logger
}

func NewHandler(svc *Service, log *logger.Logger) *Handler {
	return &Handler{svc: svc, log: log}
}

func (h *Handler) Trigger(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	name := r.PathValue("name")
	if name == "" {
		http.Error(w, "workflow name required", http.StatusBadRequest)
		return
	}
	ctx := r.Context()
	execID, err := h.svc.Trigger(ctx, name)
	if err != nil {
		h.log.Error(ctx, "trigger failed", "workflow", name, "error", err)
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"execution_id": execID})
}

func (h *Handler) ListWorkflows(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	list, err := h.svc.ListWorkflows(ctx)
	if err != nil {
		h.log.Error(ctx, "list workflows failed", "error", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func (h *Handler) GetExecution(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		http.Error(w, "execution id required", http.StatusBadRequest)
		return
	}
	ctx := r.Context()
	exec, err := h.svc.GetExecution(ctx, id)
	if err != nil {
		h.log.Error(ctx, "get execution failed", "id", id, "error", err)
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(exec)
}

func (h *Handler) ListExecutions(w http.ResponseWriter, r *http.Request) {
	workflowID := r.URL.Query().Get("workflow_id")
	if workflowID == "" {
		http.Error(w, "workflow_id required", http.StatusBadRequest)
		return
	}
	ctx := r.Context()
	list, err := h.svc.ListExecutions(ctx, workflowID, 50)
	if err != nil {
		h.log.Error(ctx, "list executions failed", "error", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}
