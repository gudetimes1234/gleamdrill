package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`parseQty("3")`, "3, <nil>", outcome(parseQty("3"))),
			tc(`parseQty("0")`, "0, quantity 0 must be positive", outcome(parseQty("0"))),
			tc(`parseQty("two")`, `0, bad quantity "two": strconv.Atoi: parsing "two": invalid syntax`, outcome(parseQty("two"))),
			tc(`parseQty("")`, `0, bad quantity "": strconv.Atoi: parsing "": invalid syntax`, outcome(parseQty(""))),
			avoids(`\blog\.|fmt\.(Print|Fprint)`, "logging before returning"),
			uses(`fmt\.Errorf\(`, "a returned error"),
		}
	})
}
