package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxDepth([3,9,20,null,null,15,7])", 3, maxDepth(tree(3, 9, 20, x, x, 15, 7))),
			tc("maxDepth([1,null,2])", 2, maxDepth(tree(1, x, 2))),
			tc("maxDepth([])", 0, maxDepth(tree())),
			tc("maxDepth([1])", 1, maxDepth(tree(1))),
		}
	})
}
