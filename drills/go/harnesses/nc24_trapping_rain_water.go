package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("trap([0,1,0,2,1,0,1,3,2,1,2,1])", 6, trap([]int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1})),
			tc("trap([4,2,0,3,2,5])", 9, trap([]int{4, 2, 0, 3, 2, 5})),
			tc("trap([])", 0, trap([]int{})),
			tc("trap([3,2,1])", 0, trap([]int{3, 2, 1})),
		}
	})
}
