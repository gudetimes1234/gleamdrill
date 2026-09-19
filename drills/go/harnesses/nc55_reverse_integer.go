package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("reverse(123)", 321, reverse(123)),
			tc("reverse(-123)", -321, reverse(-123)),
			tc("reverse(120)", 21, reverse(120)),
			tc("reverse(0)", 0, reverse(0)),
			tc("reverse(1534236469) -- overflows", 0, reverse(1534236469)),
			tc("reverse(-2147483648) -- overflows", 0, reverse(-2147483648)),
			tc("reverse(1463847412)", 2147483641, reverse(1463847412)),
		}
	})
}
