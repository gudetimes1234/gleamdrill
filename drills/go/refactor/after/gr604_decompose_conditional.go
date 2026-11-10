package main

func isSummer(month int) bool {
	return month >= 6 && month <= 8
}

func summerCharge(quantity int) int {
	return quantity * 15
}

func regularCharge(quantity int) int {
	return quantity*12 + 100
}

func charge(month, quantity int) int {
	if isSummer(month) {
		return summerCharge(quantity)
	}
	return regularCharge(quantity)
}
