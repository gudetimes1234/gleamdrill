package main

import (
	"errors"
	"fmt"
	"strings"
)

func checkName(name string) error {
	if strings.TrimSpace(name) == "" {
		return errors.New("name is blank")
	}
	return nil
}

func checkLength(name string) error {
	if len(name) > 12 {
		return errors.New("name is too long")
	}
	return nil
}

func register(name string) error {
	err := checkName(name)
	if err != nil {
		return fmt.Errorf("register: %w", err)
	}
	err = checkLength(name)
	if err != nil {
		return fmt.Errorf("register: %w", err)
	}
	return nil
}
