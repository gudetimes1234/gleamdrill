package main

import (
	"fmt"
	"strings"
)

func statement(customer string, amounts []int) string {
	var b strings.Builder
	b.WriteString("Customer: " + customer + "\n")
	total := 0
	for _, a := range amounts {
		total += a
	}
	b.WriteString(fmt.Sprintf("Owed: %d\n", total))
	return b.String()
}
