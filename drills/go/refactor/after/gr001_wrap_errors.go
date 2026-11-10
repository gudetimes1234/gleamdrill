package main

import (
	"errors"
	"fmt"
)

var ErrNotFound = errors.New("not found")

func findUser(id int) error {
	return ErrNotFound
}

func loadProfile(id int) error {
	if err := findUser(id); err != nil {
		return fmt.Errorf("load profile %d: %w", id, err)
	}
	return nil
}
