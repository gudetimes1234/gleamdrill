package main

type Order struct {
	Price, Qty int
}

func isLarge(o Order) bool {
	basePrice := o.Price * o.Qty
	return basePrice > 1000
}
