package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("jump([2,3,1,1,4])", 2, jump([]int{2, 3, 1, 1, 4})),
			tc("jump([2,3,0,1,4])", 2, jump([]int{2, 3, 0, 1, 4})),
			tc("jump([0])", 0, jump([]int{0})),
			tc("jump([1,1,1,1])", 3, jump([]int{1, 1, 1, 1})),
		}
	})
}
