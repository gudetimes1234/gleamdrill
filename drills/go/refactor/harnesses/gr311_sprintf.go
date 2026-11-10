package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`receiptLine("tea", 2, 3.5)`, "tea x2 @ $3.50 = $7.00", receiptLine("tea", 2, 3.5)),
			tc(`receiptLine("cake", 3, 2.99)`, "cake x3 @ $2.99 = $8.97", receiptLine("cake", 3, 2.99)),
			tc(`receiptLine("pen", 0, 1.25)`, "pen x0 @ $1.25 = $0.00", receiptLine("pen", 0, 1.25)),
			tc(`receiptLine("", 1, 0)`, " x1 @ $0.00 = $0.00", receiptLine("", 1, 0)),
			avoids(`strconv\.`, "strconv conversions"),
			uses(`fmt\.Sprintf\(`, "fmt.Sprintf"),
		}
	})
}
