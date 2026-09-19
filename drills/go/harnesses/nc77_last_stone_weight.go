package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("lastStoneWeight([2,7,4,1,8,1])", 1, lastStoneWeight([]int{2, 7, 4, 1, 8, 1})),
			tc("lastStoneWeight([1])", 1, lastStoneWeight([]int{1})),
			tc("lastStoneWeight([2,2])", 0, lastStoneWeight([]int{2, 2})),
			tc("lastStoneWeight([])", 0, lastStoneWeight([]int{})),
			tc("lastStoneWeight([10,4,2,10])", 2, lastStoneWeight([]int{10, 4, 2, 10})),
		}
	})
}
