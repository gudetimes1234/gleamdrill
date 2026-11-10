package main

import "fmt"

func formatCents(cents int) string {
	return fmt.Sprintf("$%d.%02d", cents/100, cents%100)
}

func receiptLine(item string, cents int) string {
	return item + ": " + formatCents(cents)
}
