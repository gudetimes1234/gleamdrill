package main

func main() {
	run(func() []testCase {
		bst := tree(5, 3, 6, 2, 4, x, x, 1)
		return []testCase{
			tc("kthSmallest(bst, 1)", 1, kthSmallest(bst, 1)),
			tc("kthSmallest(bst, 2)", 2, kthSmallest(bst, 2)),
			tc("kthSmallest(bst, 3)", 3, kthSmallest(bst, 3)),
			tc("kthSmallest(bst, 4)", 4, kthSmallest(bst, 4)),
			tc("kthSmallest(bst, 6)", 6, kthSmallest(bst, 6)),
			tc("kthSmallest([7], 1)", 7, kthSmallest(tree(7), 1)),
		}
	})
}
