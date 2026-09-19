package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("countBits(2)", []int{0, 1, 1}, countBits(2)),
			tc("countBits(5)", []int{0, 1, 1, 2, 1, 2}, countBits(5)),
			tc("countBits(0)", []int{0}, countBits(0)),
			tc("countBits(8)", []int{0, 1, 1, 2, 1, 2, 2, 3, 1}, countBits(8)),
		}
	})
}
