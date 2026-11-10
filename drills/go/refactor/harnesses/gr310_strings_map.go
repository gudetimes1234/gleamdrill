package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`maskDigits("card 4242-1234")`, "card ****-****", maskDigits("card 4242-1234")),
			tc(`maskDigits("€5 off")`, "€* off", maskDigits("€5 off")),
			tc(`maskDigits("no digits")`, "no digits", maskDigits("no digits")),
			tc(`maskDigits("")`, "", maskDigits("")),
			avoids(`\bfor\b`, "a rune loop"),
			uses(`strings\.Map\(`, "strings.Map"),
		}
	})
}
