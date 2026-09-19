package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("twoSum([2, 7, 11, 15], 9)", []int{1, 2}, twoSum([]int{2, 7, 11, 15}, 9)),
			tc("twoSum([2, 3, 4], 6)", []int{1, 3}, twoSum([]int{2, 3, 4}, 6)),
			tc("twoSum([-1, 0], -1)", []int{1, 2}, twoSum([]int{-1, 0}, -1)),
			tc("twoSum([1, 2, 3], 100)", []int{}, twoSum([]int{1, 2, 3}, 100)),
		}
	})
}
