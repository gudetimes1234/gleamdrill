package main

import (
	"fmt"
	"strings"
)

func totalOwed(amounts []int) int {
	total := 0
	for _, a := range amounts {
		total += a
	}
	return total
}

func statement(customer string, amounts []int) string {
	var b strings.Builder
	b.WriteString("Customer: " + customer + "\n")
	b.WriteString(fmt.Sprintf("Owed: %d\n", totalOwed(amounts)))
	return b.String()
}
