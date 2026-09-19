package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isSameTree([1,2,3], [1,2,3])", true, isSameTree(tree(1, 2, 3), tree(1, 2, 3))),
			tc("isSameTree([1,2], [1,null,2])", false, isSameTree(tree(1, 2), tree(1, x, 2))),
			tc("isSameTree([1,2,1], [1,1,2])", false, isSameTree(tree(1, 2, 1), tree(1, 1, 2))),
			tc("isSameTree([], [])", true, isSameTree(tree(), tree())),
			tc("isSameTree([1], [])", false, isSameTree(tree(1), tree())),
		}
	})
}
