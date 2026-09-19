package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("rob([2,3,2])", 3, rob([]int{2, 3, 2})),
			tc("rob([1,2,3,1])", 4, rob([]int{1, 2, 3, 1})),
			tc("rob([1,2,3])", 3, rob([]int{1, 2, 3})),
			tc("rob([1])", 1, rob([]int{1})),
			tc("rob([1,2])", 2, rob([]int{1, 2})),
		}
	})
}
