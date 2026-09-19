package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("search([-1, 0, 3, 5, 9, 12], 9)", 4, search([]int{-1, 0, 3, 5, 9, 12}, 9)),
			tc("search([-1, 0, 3, 5, 9, 12], 2)", -1, search([]int{-1, 0, 3, 5, 9, 12}, 2)),
			tc("search([5], 5)", 0, search([]int{5}, 5)),
			tc("search([], 1)", -1, search([]int{}, 1)),
		}
	})
}
