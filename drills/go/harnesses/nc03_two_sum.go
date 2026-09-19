package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("twoSum([2, 7, 11, 15], 9)", []int{0, 1}, twoSum([]int{2, 7, 11, 15}, 9)),
			tc("twoSum([3, 2, 4], 6)", []int{1, 2}, twoSum([]int{3, 2, 4}, 6)),
			tc("twoSum([3, 3], 6)", []int{0, 1}, twoSum([]int{3, 3}, 6)),
			tc("twoSum([1, 2], 7)", []int{}, twoSum([]int{1, 2}, 7)),
		}
	})
}
