package main

import (
	"errors"
	"strings"
)

func validateSignup(name, email string, age int) error {
	var problems []string
	if name == "" {
		problems = append(problems, "name is required")
	}
	if !strings.Contains(email, "@") {
		problems = append(problems, "email needs an @")
	}
	if age < 13 {
		problems = append(problems, "must be 13 or older")
	}
	if len(problems) == 0 {
		return nil
	}
	return errors.New(strings.Join(problems, "\n"))
}
