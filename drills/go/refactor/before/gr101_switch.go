package main

func shippingCost(zone string) int {
	if zone == "local" {
		return 5
	} else if zone == "national" {
		return 10
	} else if zone == "international" {
		return 25
	} else {
		return -1
	}
}
