package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`dedupeSorted([]int{1, 1, 2, 3, 3, 3})`, []int{1, 2, 3}, dedupeSorted([]int{1, 1, 2, 3, 3, 3})),
			tc(`dedupeSorted([]int{2, 2})`, []int{2}, dedupeSorted([]int{2, 2})),
			tc(`dedupeSorted([]int{1, 2, 3}) -- no repeats`, []int{1, 2, 3}, dedupeSorted([]int{1, 2, 3})),
			tc(`dedupeSorted([]int{4})`, []int{4}, dedupeSorted([]int{4})),
			tc(`dedupeSorted(nil)`, []int{}, dedupeSorted(nil)),
			uses(`slices\.Compact\(`, "slices.Compact"),
			avoids(`\bfor\b`, "a write-index loop"),
		}
	})
}
