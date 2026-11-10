package main

func toFahrenheit(celsius float64) float64 {
	return celsius*9/5 + 32
}

func hasFever(celsius float64) bool {
	return toFahrenheit(celsius) >= 100.4
}
