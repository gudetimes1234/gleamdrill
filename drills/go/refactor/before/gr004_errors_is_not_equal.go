package main

import "errors"

var (
	ErrNotFound  = errors.New("not found")
	ErrForbidden = errors.New("forbidden")
)

func statusCode(err error) int {
	if err == nil {
		return 200
	}
	if err == ErrNotFound {
		return 404
	}
	if err == ErrForbidden {
		return 403
	}
	return 500
}
