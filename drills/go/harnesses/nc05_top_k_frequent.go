package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("topKFrequent([1, 1, 1, 2, 2, 3], 2)", []int{1, 2}, sortInts(topKFrequent([]int{1, 1, 1, 2, 2, 3}, 2))),
			tc("topKFrequent([1], 1)", []int{1}, topKFrequent([]int{1}, 1)),
			tc("topKFrequent([5, 5, 4, 4, 4, 3], 1)", []int{4}, topKFrequent([]int{5, 5, 4, 4, 4, 3}, 1)),
		}
	})
}
