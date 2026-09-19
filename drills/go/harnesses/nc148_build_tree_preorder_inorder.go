package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("buildTree([3,9,20,15,7], [9,3,15,20,7])", tree(3, 9, 20, x, x, 15, 7), buildTree([]int{3, 9, 20, 15, 7}, []int{9, 3, 15, 20, 7})),
			tc("buildTree([], [])", tree(), buildTree([]int{}, []int{})),
			tc("buildTree([-1], [-1])", tree(-1), buildTree([]int{-1}, []int{-1})),
			tc("buildTree([1,2,3], [3,2,1]) -- leaning left", tree(1, 2, x, 3), buildTree([]int{1, 2, 3}, []int{3, 2, 1})),
			tc("buildTree([1,2,3], [1,2,3]) -- leaning right", tree(1, x, 2, x, 3), buildTree([]int{1, 2, 3}, []int{1, 2, 3})),
		}
	})
}
