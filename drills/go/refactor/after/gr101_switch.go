package main

func shippingCost(zone string) int {
	switch zone {
	case "local":
		return 5
	case "national":
		return 10
	case "international":
		return 25
	default:
		return -1
	}
}
