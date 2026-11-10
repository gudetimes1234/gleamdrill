package main

import "errors"

type FieldError struct {
	Field string
}

func (e *FieldError) Error() string {
	return "invalid " + e.Field
}

func badField(err error) string {
	var fe *FieldError
	if errors.As(err, &fe) {
		return fe.Field
	}
	return ""
}
