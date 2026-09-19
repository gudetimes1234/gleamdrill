package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("numDecodings('12')", 2, numDecodings("12")),
			tc("numDecodings('226')", 3, numDecodings("226")),
			tc("numDecodings('06')", 0, numDecodings("06")),
			tc("numDecodings('10')", 1, numDecodings("10")),
			tc("numDecodings('27')", 1, numDecodings("27")),
			tc("numDecodings('100')", 0, numDecodings("100")),
			tc("numDecodings('1111')", 5, numDecodings("1111")),
		}
	})
}
