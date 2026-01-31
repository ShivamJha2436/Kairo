package execution

const (
	StatusPending   = "pending"
	StatusRunning   = "running"
	StatusCompleted = "completed"
	StatusFailed    = "failed"
)

func ValidStatus(s string) bool {
	switch s {
	case StatusPending, StatusRunning, StatusCompleted, StatusFailed:
		return true
	default:
		return false
	}
}
