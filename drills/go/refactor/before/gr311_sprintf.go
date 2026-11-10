package main

import "strconv"

func receiptLine(item string, qty int, price float64) string {
	return item + " x" + strconv.Itoa(qty) + " @ $" + strconv.FormatFloat(price, 'f', 2, 64) +
		" = $" + strconv.FormatFloat(price*float64(qty), 'f', 2, 64)
}
