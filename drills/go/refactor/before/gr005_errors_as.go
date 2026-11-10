package main

type FieldError struct {
	Field string
}

func (e *FieldError) Error() string {
	return "invalid " + e.Field
}

func badField(err error) string {
	if fe, ok := err.(*FieldError); ok {
		return fe.Field
	}
	return ""
}
