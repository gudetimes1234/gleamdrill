package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isNStraightHand([1,2,3,6,2,3,4,7,8], 3)", true, isNStraightHand([]int{1, 2, 3, 6, 2, 3, 4, 7, 8}, 3)),
			tc("isNStraightHand([1,2,3,4,5], 4)", false, isNStraightHand([]int{1, 2, 3, 4, 5}, 4)),
			tc("isNStraightHand([1,2,3,4,5,6], 2)", true, isNStraightHand([]int{1, 2, 3, 4, 5, 6}, 2)),
			tc("isNStraightHand([], 1)", true, isNStraightHand([]int{}, 1)),
			tc("isNStraightHand([1,1,2,2,3,3], 3)", true, isNStraightHand([]int{1, 1, 2, 2, 3, 3}, 3)),
			tc("isNStraightHand([8,10,12], 3)", false, isNStraightHand([]int{8, 10, 12}, 3)),
		}
	})
}
