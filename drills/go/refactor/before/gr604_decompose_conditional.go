package main

func charge(month, quantity int) int {
	if month >= 6 && month <= 8 {
		return quantity * 15
	}
	return quantity*12 + 100
}
