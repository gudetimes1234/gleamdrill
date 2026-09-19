package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("multiply('2', '3')", "6", multiply("2", "3")),
			tc("multiply('123', '456')", "56088", multiply("123", "456")),
			tc("multiply('0', '52')", "0", multiply("0", "52")),
			tc("multiply('99', '99')", "9801", multiply("99", "99")),
			tc("multiply('123456789', '987654321')", "121932631112635269", multiply("123456789", "987654321")),
		}
	})
}
