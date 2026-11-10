package main

import "strconv"

func describe(v any) string {
	if n, ok := v.(int); ok {
		return "int " + strconv.Itoa(n)
	}
	if s, ok := v.(string); ok {
		return "string " + s
	}
	if b, ok := v.(bool); ok {
		return "bool " + strconv.FormatBool(b)
	}
	return "unknown"
}
