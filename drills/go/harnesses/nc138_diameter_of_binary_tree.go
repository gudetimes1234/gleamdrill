package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("diameterOfBinaryTree([1,2,3,4,5])", 3, diameterOfBinaryTree(tree(1, 2, 3, 4, 5))),
			tc("diameterOfBinaryTree([1,2])", 1, diameterOfBinaryTree(tree(1, 2))),
			tc("diameterOfBinaryTree([1])", 0, diameterOfBinaryTree(tree(1))),
			tc("diameterOfBinaryTree([])", 0, diameterOfBinaryTree(tree())),
			tc("diameterOfBinaryTree(the path avoids the root)", 4, diameterOfBinaryTree(tree(1, 2, x, 3, 4, x, x, 5, x, x, 6))),
		}
	})
}
