package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("isValidBST([2,1,3])", true, isValidBST(tree(2, 1, 3))),
			tc("isValidBST([5,1,4,null,null,3,6])", false, isValidBST(tree(5, 1, 4, x, x, 3, 6))),
			tc("isValidBST([5,4,6,null,null,3,7]) -- the 3 breaks an ancestor's bound", false, isValidBST(tree(5, 4, 6, x, x, 3, 7))),
			tc("isValidBST([2,2,2]) -- equal values are not allowed", false, isValidBST(tree(2, 2, 2))),
			tc("isValidBST([])", true, isValidBST(tree())),
			tc("isValidBST([1])", true, isValidBST(tree(1))),
		}
	})
}
