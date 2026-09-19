package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findDuplicate([1,3,4,2,2])", 2, findDuplicate([]int{1, 3, 4, 2, 2})),
			tc("findDuplicate([3,1,3,4,2])", 3, findDuplicate([]int{3, 1, 3, 4, 2})),
			tc("findDuplicate([1,1])", 1, findDuplicate([]int{1, 1})),
			tc("findDuplicate([2,2,2,2,2]) -- repeated more than twice", 2, findDuplicate([]int{2, 2, 2, 2, 2})),
			tc("findDuplicate([1,4,4,2,4])", 4, findDuplicate([]int{1, 4, 4, 2, 4})),
		}
	})
}
