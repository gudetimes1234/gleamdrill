package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("rightSideView([1,2,3,null,5,null,4])", []int{1, 3, 4}, rightSideView(tree(1, 2, 3, x, 5, x, 4))),
			tc("rightSideView([1,null,3])", []int{1, 3}, rightSideView(tree(1, x, 3))),
			tc("rightSideView([])", []int{}, rightSideView(tree())),
			tc("rightSideView([1,2,3,4]) -- a left node shows below", []int{1, 3, 4}, rightSideView(tree(1, 2, 3, 4))),
		}
	})
}
