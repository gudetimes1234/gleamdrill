package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("containsDuplicate([1, 2, 3, 1])", true, containsDuplicate([]int{1, 2, 3, 1})),
			tc("containsDuplicate([1, 2, 3, 4])", false, containsDuplicate([]int{1, 2, 3, 4})),
			tc("containsDuplicate([])", false, containsDuplicate([]int{})),
			tc("containsDuplicate([7, 7])", true, containsDuplicate([]int{7, 7})),
		}
	})
}
