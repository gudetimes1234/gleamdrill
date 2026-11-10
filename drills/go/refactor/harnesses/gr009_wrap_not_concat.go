package main

import "fmt"

func outcome(n int, err error) string {
	return fmt.Sprintf("%d, %v", n, err)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`readTimeout("30")`, "30, <nil>", outcome(readTimeout("30"))),
			tc(`readTimeout("-5")`, "-5, <nil>", outcome(readTimeout("-5"))),
			tc(`readTimeout("abc")`, `0, read timeout: strconv.Atoi: parsing "abc": invalid syntax`, outcome(readTimeout("abc"))),
			tc(`readTimeout("")`, `0, read timeout: strconv.Atoi: parsing "": invalid syntax`, outcome(readTimeout(""))),
			avoids(`\.Error\(\)`, "err.Error() glued into a new error"),
			uses(`%w`, "%w to wrap the cause"),
		}
	})
}
