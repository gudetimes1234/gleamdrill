package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isBalanced([3,9,20,null,null,15,7])", true, isBalanced(tree(3, 9, 20, x, x, 15, 7))),
			tc("isBalanced([1,2,2,3,3,null,null,4,4])", false, isBalanced(tree(1, 2, 2, 3, 3, x, x, 4, 4))),
			tc("isBalanced([])", true, isBalanced(tree())),
			tc("isBalanced([1,2,null,3]) -- a chain of three", false, isBalanced(tree(1, 2, x, 3))),
			tc("isBalanced(balanced at every node but the root)", false, isBalanced(tree(1, 2, 2, 3, x, x, 3, 4, x, x, 4))),
		}
	})
}
