package main

type Order struct {
	Quantity, ItemPrice int
}

func (o Order) basePrice() int {
	return o.Quantity * o.ItemPrice
}

func (o Order) Price() int {
	if o.basePrice() > 1000 {
		return o.basePrice() * 95 / 100
	}
	return o.basePrice() * 98 / 100
}
