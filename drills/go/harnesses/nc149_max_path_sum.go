package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxPathSum([1,2,3])", 6, maxPathSum(tree(1, 2, 3))),
			tc("maxPathSum([-10,9,20,null,null,15,7])", 42, maxPathSum(tree(-10, 9, 20, x, x, 15, 7))),
			tc("maxPathSum([-3]) -- a single negative node", -3, maxPathSum(tree(-3))),
			tc("maxPathSum([-2,-1]) -- all negative", -1, maxPathSum(tree(-2, -1))),
			tc("maxPathSum([0])", 0, maxPathSum(tree(0))),
		}
	})
}
