package main

import "fmt"

func receiptLine(item string, qty int, price float64) string {
	return fmt.Sprintf("%s x%d @ $%.2f = $%.2f", item, qty, price, price*float64(qty))
}
