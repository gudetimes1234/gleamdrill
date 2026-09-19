package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("canJump([2,3,1,1,4])", true, canJump([]int{2, 3, 1, 1, 4})),
			tc("canJump([3,2,1,0,4])", false, canJump([]int{3, 2, 1, 0, 4})),
			tc("canJump([0])", true, canJump([]int{0})),
			tc("canJump([0, 1])", false, canJump([]int{0, 1})),
		}
	})
}
