package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("rob([1,2,3,1])", 4, rob([]int{1, 2, 3, 1})),
			tc("rob([2,7,9,3,1])", 12, rob([]int{2, 7, 9, 3, 1})),
			tc("rob([5])", 5, rob([]int{5})),
			tc("rob([])", 0, rob([]int{})),
			tc("rob([2,1,1,2])", 4, rob([]int{2, 1, 1, 2})),
		}
	})
}
