package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("change(5, [1,2,5])", 4, change(5, []int{1, 2, 5})),
			tc("change(3, [2])", 0, change(3, []int{2})),
			tc("change(10, [10])", 1, change(10, []int{10})),
			tc("change(0, [1,2])", 1, change(0, []int{1, 2})),
			tc("change(500, [3,5,7,8,9,10,11])", 35502874, change(500, []int{3, 5, 7, 8, 9, 10, 11})),
		}
	})
}
