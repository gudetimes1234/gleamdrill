package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("canPartition([1,5,11,5])", true, canPartition([]int{1, 5, 11, 5})),
			tc("canPartition([1,2,3,5])", false, canPartition([]int{1, 2, 3, 5})),
			tc("canPartition([2,2])", true, canPartition([]int{2, 2})),
			tc("canPartition([1])", false, canPartition([]int{1})),
			tc("canPartition([1,2,5])", false, canPartition([]int{1, 2, 5})),
		}
	})
}
