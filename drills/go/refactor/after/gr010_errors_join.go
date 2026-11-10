package main

import (
	"errors"
	"strings"
)

func validateSignup(name, email string, age int) error {
	var errs []error
	if name == "" {
		errs = append(errs, errors.New("name is required"))
	}
	if !strings.Contains(email, "@") {
		errs = append(errs, errors.New("email needs an @"))
	}
	if age < 13 {
		errs = append(errs, errors.New("must be 13 or older"))
	}
	return errors.Join(errs...)
}
