package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("levelOrder([3,9,20,null,null,15,7])", [][]int{{3}, {9, 20}, {15, 7}}, levelOrder(tree(3, 9, 20, x, x, 15, 7))),
			tc("levelOrder([1])", [][]int{{1}}, levelOrder(tree(1))),
			tc("levelOrder([])", [][]int{}, levelOrder(tree())),
			tc("levelOrder([1,2,null,3]) -- a chain", [][]int{{1}, {2}, {3}}, levelOrder(tree(1, 2, x, 3))),
		}
	})
}
