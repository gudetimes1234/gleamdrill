package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("goodNodes([3,1,4,3,null,1,5])", 4, goodNodes(tree(3, 1, 4, 3, x, 1, 5))),
			tc("goodNodes([])", 0, goodNodes(tree())),
			tc("goodNodes([1])", 1, goodNodes(tree(1))),
			tc("goodNodes([2,2]) -- equal counts as good", 2, goodNodes(tree(2, 2))),
			tc("goodNodes([3,3,null,4,2])", 3, goodNodes(tree(3, 3, x, 4, 2))),
		}
	})
}
