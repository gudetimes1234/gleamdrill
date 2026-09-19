package main

func roundTrip(values ...any) *TreeNode {
	return deserialize(serialize(tree(values...)))
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("deserialize(serialize([1,2,3,null,null,4,5]))", tree(1, 2, 3, x, x, 4, 5), roundTrip(1, 2, 3, x, x, 4, 5)),
			tc("deserialize(serialize([]))", tree(), roundTrip()),
			tc("deserialize(serialize([0]))", tree(0), roundTrip(0)),
			tc("deserialize(serialize(a lopsided tree))", tree(1, 2, x, 3, x, x, 4), roundTrip(1, 2, x, 3, x, x, 4)),
			tc("deserialize(serialize([-1,-2,-3])) -- negatives survive", tree(-1, -2, -3), roundTrip(-1, -2, -3)),
		}
	})
}
