package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`orderTotal("widget 3 250")`, 750, orderTotal("widget 3 250")),
			tc(`orderTotal("bolt 10 30") -- bulk discount`, 270, orderTotal("bolt 10 30")),
			tc(`orderTotal("  gear  2   5 ")`, 10, orderTotal("  gear  2   5 ")),
			tc(`orderTotal("pen 0 100")`, 0, orderTotal("pen 0 100")),
			uses(`\btype\s+\w+\s+struct\b`, "an intermediate struct between the phases"),
			uses(`(?s)(\bfunc\s.*){3}`, "separate parse and price functions"),
		}
	})
}
