package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("search([4, 5, 6, 7, 0, 1, 2], 0)", 4, search([]int{4, 5, 6, 7, 0, 1, 2}, 0)),
			tc("search([4, 5, 6, 7, 0, 1, 2], 3)", -1, search([]int{4, 5, 6, 7, 0, 1, 2}, 3)),
			tc("search([1], 0)", -1, search([]int{1}, 0)),
			tc("search([1, 3], 3)", 1, search([]int{1, 3}, 3)),
			tc("search([3, 1], 1)", 1, search([]int{3, 1}, 1)),
		}
	})
}
