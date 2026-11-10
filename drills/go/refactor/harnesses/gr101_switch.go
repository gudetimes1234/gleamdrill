package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`shippingCost("local")`, 5, shippingCost("local")),
			tc(`shippingCost("national")`, 10, shippingCost("national")),
			tc(`shippingCost("international")`, 25, shippingCost("international")),
			tc(`shippingCost("moon") -- unknown zone`, -1, shippingCost("moon")),
			uses(`\bswitch\b`, "a switch"),
			avoids(`else if`, "an else-if chain"),
		}
	})
}
