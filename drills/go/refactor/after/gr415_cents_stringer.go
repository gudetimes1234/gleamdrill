package main

import "fmt"

type Cents int

func (c Cents) String() string {
	return fmt.Sprintf("$%d.%02d", int(c)/100, int(c)%100)
}

func receiptLine(item string, price Cents) string {
	return fmt.Sprintf("%s: %v", item, price)
}
