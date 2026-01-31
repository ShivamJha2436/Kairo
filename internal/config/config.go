package config

import (
	"os"
	"strconv"
)

type Config struct {
	Port        int
	Env         string
	DatabaseURL string
	RedisURL    string
	LogLevel    string
}

func Load() (*Config, error) {
	port := 8080
	if p := os.Getenv("PORT"); p != "" {
		if v, err := strconv.Atoi(p); err == nil {
			port = v
		}
	}
	env := os.Getenv("ENV")
	if env == "" {
		env = "development"
	}
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://kairo:kairo@localhost:5432/kairo?sslmode=disable"
	}
	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		redisURL = "redis://localhost:6379/0"
	}
	logLevel := os.Getenv("LOG_LEVEL")
	if logLevel == "" {
		logLevel = "info"
	}
	return &Config{
		Port:        port,
		Env:         env,
		DatabaseURL: dbURL,
		RedisURL:    redisURL,
		LogLevel:    logLevel,
	}, nil
}
