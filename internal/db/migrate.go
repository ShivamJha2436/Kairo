package db

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Migrate(databaseURL string) error {
	ctx := context.Background()
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		return fmt.Errorf("connect: %w", err)
	}
	defer pool.Close()

	path := filepath.Join("migrations", "001_init.sql")
	sql, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("read migration: %w", err)
	}
	_, err = pool.Exec(ctx, string(sql))
	if err != nil {
		return fmt.Errorf("run migration: %w", err)
	}
	return nil
}
