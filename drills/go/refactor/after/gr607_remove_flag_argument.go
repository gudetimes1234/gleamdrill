package main

func rushDeliveryDay(placed int) int {
	return placed + 1
}

func regularDeliveryDay(placed int) int {
	return placed + 3
}

func schedule(placed int, plan string) int {
	if plan == "rush" {
		return rushDeliveryDay(placed)
	}
	return regularDeliveryDay(placed)
}
