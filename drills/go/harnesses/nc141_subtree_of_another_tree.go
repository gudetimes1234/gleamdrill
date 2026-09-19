package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isSubtree([3,4,5,1,2], [4,1,2])", true, isSubtree(tree(3, 4, 5, 1, 2), tree(4, 1, 2))),
			tc("isSubtree(a near match with an extra node)", false, isSubtree(tree(3, 4, 5, 1, 2, x, x, x, x, 0), tree(4, 1, 2))),
			tc("isSubtree([1], [1]) -- a tree is its own subtree", true, isSubtree(tree(1), tree(1))),
			tc("isSubtree([], [1])", false, isSubtree(tree(), tree(1))),
			tc("isSubtree([1], []) -- the empty tree is in everything", true, isSubtree(tree(1), tree())),
			tc("isSubtree([12], [2]) -- values are not digits", false, isSubtree(tree(12), tree(2))),
		}
	})
}
