package main

type Celsius float64

type Fahrenheit float64

func toFahrenheit(c Celsius) Fahrenheit {
	return Fahrenheit(c*9/5 + 32)
}

func hasFever(c Celsius) bool {
	return toFahrenheit(c) >= 100.4
}
