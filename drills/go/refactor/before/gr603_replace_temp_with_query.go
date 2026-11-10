package main

type Order struct {
	Quantity, ItemPrice int
}

func (o Order) Price() int {
	basePrice := o.Quantity * o.ItemPrice
	if basePrice > 1000 {
		return basePrice * 95 / 100
	}
	return basePrice * 98 / 100
}
