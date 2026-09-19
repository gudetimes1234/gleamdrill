package main

func ancestor(root *TreeNode, p, q int) int {
	return lowestCommonAncestor(root, find(root, p), find(root, q)).Val
}

func main() {
	run(func() []testCase {
		bst := tree(6, 2, 8, 0, 4, 7, 9, x, x, 3, 5)
		return []testCase{
			tc("lowestCommonAncestor(bst, 2, 8)", 6, ancestor(bst, 2, 8)),
			tc("lowestCommonAncestor(bst, 2, 4) -- an ancestor counts", 2, ancestor(bst, 2, 4)),
			tc("lowestCommonAncestor(bst, 3, 5)", 4, ancestor(bst, 3, 5)),
			tc("lowestCommonAncestor(bst, 7, 9)", 8, ancestor(bst, 7, 9)),
			tc("lowestCommonAncestor([1], 1, 1)", 1, ancestor(tree(1), 1, 1)),
		}
	})
}
