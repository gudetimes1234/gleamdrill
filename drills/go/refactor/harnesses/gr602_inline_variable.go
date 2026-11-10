package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`isLarge(Order{Price: 10, Qty: 200})`, true, isLarge(Order{Price: 10, Qty: 200})),
			tc(`isLarge(Order{Price: 10, Qty: 100}) -- exactly 1000`, false, isLarge(Order{Price: 10, Qty: 100})),
			tc(`isLarge(Order{})`, false, isLarge(Order{})),
			uses(`return[^\n]*\*[^\n]*>`, "the product compared in the return"),
			avoids(`:=|\bvar\s`, "a temporary variable"),
		}
	})
}
