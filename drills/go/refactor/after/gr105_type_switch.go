package main

import "strconv"

func describe(v any) string {
	switch t := v.(type) {
	case int:
		return "int " + strconv.Itoa(t)
	case string:
		return "string " + t
	case bool:
		return "bool " + strconv.FormatBool(t)
	default:
		return "unknown"
	}
}
