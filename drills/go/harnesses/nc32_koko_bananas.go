package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("minEatingSpeed([3,6,7,11], 8)", 4, minEatingSpeed([]int{3, 6, 7, 11}, 8)),
			tc("minEatingSpeed([30,11,23,4,20], 5)", 30, minEatingSpeed([]int{30, 11, 23, 4, 20}, 5)),
			tc("minEatingSpeed([30,11,23,4,20], 6)", 23, minEatingSpeed([]int{30, 11, 23, 4, 20}, 6)),
			tc("minEatingSpeed([1], 1)", 1, minEatingSpeed([]int{1}, 1)),
		}
	})
}
