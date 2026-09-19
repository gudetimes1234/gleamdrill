package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("carFleet(12, [10,8,0,5,3], [2,4,1,1,3])", 3, carFleet(12, []int{10, 8, 0, 5, 3}, []int{2, 4, 1, 1, 3})),
			tc("carFleet(10, [3], [3])", 1, carFleet(10, []int{3}, []int{3})),
			tc("carFleet(100, [0,2,4], [4,2,1])", 1, carFleet(100, []int{0, 2, 4}, []int{4, 2, 1})),
			tc("carFleet(10, [6,8], [3,2])", 2, carFleet(10, []int{6, 8}, []int{3, 2})),
		}
	})
}
