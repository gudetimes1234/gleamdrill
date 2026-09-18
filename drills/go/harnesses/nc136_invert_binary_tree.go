package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("invertTree([4,2,7,1,3,6,9])", tree(4, 7, 2, 9, 6, 3, 1), invertTree(tree(4, 2, 7, 1, 3, 6, 9))),
			tc("invertTree([]) -- an empty tree", tree(), invertTree(tree())),
			tc("invertTree([1]) -- a single node", tree(1), invertTree(tree(1))),
			tc("invertTree twice is the original", tree(1, 2), invertTree(invertTree(tree(1, 2)))),
		}
	})
}
