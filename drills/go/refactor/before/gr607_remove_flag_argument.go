package main

func deliveryDay(placed int, rush bool) int {
	if rush {
		return placed + 1
	}
	return placed + 3
}

func schedule(placed int, plan string) int {
	if plan == "rush" {
		return deliveryDay(placed, true)
	}
	return deliveryDay(placed, false)
}
