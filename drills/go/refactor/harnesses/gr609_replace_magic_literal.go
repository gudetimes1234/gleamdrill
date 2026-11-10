package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`lateFee(10)`, 175, lateFee(10)),
			tc(`lateFee(4)`, 25, lateFee(4)),
			tc(`lateFee(3) -- last day of grace`, 0, lateFee(3)),
			tc(`lateFee(0)`, 0, lateFee(0)),
			uses(`\bconst\b`, "named constants"),
			avoids(`(<|>|-|\*|\+|/)=?\s*(3|25)\b`, "bare 3 and 25 in the logic"),
		}
	})
}
