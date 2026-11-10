package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`toFahrenheit(100)`, 212, toFahrenheit(100)),
			tc(`toFahrenheit(0)`, 32, toFahrenheit(0)),
			tc(`toFahrenheit(-40)`, -40, toFahrenheit(-40)),
			tc(`hasFever(39)`, true, hasFever(39)),
			tc(`hasFever(37)`, false, hasFever(37)),
			uses(`\btype\s+\w+\s+float64\b`, "a named temperature type"),
			avoids(`\w+\s+float64\s*\)`, "bare float64 parameters"),
		}
	})
}
