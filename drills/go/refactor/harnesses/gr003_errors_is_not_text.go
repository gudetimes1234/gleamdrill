package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		menu := map[string]int{"tea": 3, "broken": -1}
		return []testCase{
			tc(`priceOrZero(menu, "tea")`, "3, <nil>", outcome(priceOrZero(menu, "tea"))),
			tc(`priceOrZero(menu, "cake") -- missing`, "0, <nil>", outcome(priceOrZero(menu, "cake"))),
			tc(`priceOrZero(menu, "broken")`, "0, negative price for broken", outcome(priceOrZero(menu, "broken"))),
			tc(`priceOrZero(map[string]int{}, "tea")`, "0, <nil>", outcome(priceOrZero(map[string]int{}, "tea"))),
			avoids(`\.Error\(\)\s*[!=]=`, "comparing err.Error() text"),
			uses(`errors\.Is\(`, "errors.Is"),
		}
	})
}
