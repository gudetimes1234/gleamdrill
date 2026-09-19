package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxProduct([2,3,-2,4])", 6, maxProduct([]int{2, 3, -2, 4})),
			tc("maxProduct([-2,0,-1])", 0, maxProduct([]int{-2, 0, -1})),
			tc("maxProduct([-2])", -2, maxProduct([]int{-2})),
			tc("maxProduct([-2,3,-4])", 24, maxProduct([]int{-2, 3, -4})),
			tc("maxProduct([0,2])", 2, maxProduct([]int{0, 2})),
		}
	})
}
