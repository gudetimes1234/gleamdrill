package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])", 3, canCompleteCircuit([]int{1, 2, 3, 4, 5}, []int{3, 4, 5, 1, 2})),
			tc("canCompleteCircuit([2,3,4], [3,4,3])", -1, canCompleteCircuit([]int{2, 3, 4}, []int{3, 4, 3})),
			tc("canCompleteCircuit([5], [4])", 0, canCompleteCircuit([]int{5}, []int{4})),
			tc("canCompleteCircuit([1,2], [2,1])", 1, canCompleteCircuit([]int{1, 2}, []int{2, 1})),
		}
	})
}
