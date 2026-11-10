package main

import "strings"

func csvRow(fields []string) string {
	return strings.Join(fields, ",")
}
