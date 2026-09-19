package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findMin([3, 4, 5, 1, 2])", 1, findMin([]int{3, 4, 5, 1, 2})),
			tc("findMin([4, 5, 6, 7, 0, 1, 2])", 0, findMin([]int{4, 5, 6, 7, 0, 1, 2})),
			tc("findMin([11, 13, 15, 17])", 11, findMin([]int{11, 13, 15, 17})),
			tc("findMin([2, 1])", 1, findMin([]int{2, 1})),
		}
	})
}
