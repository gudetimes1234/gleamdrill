package main

type Order struct {
	Price, Qty int
}

func isLarge(o Order) bool {
	return o.Price*o.Qty > 1000
}
