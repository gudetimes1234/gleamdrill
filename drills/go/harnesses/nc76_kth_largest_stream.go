package main

func stream(k int, initial []int, added []int) []int {
	store := Constructor(k, initial)
	out := []int{}
	for _, n := range added {
		out = append(out, store.Add(n))
	}
	return out
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("k = 3 over [4, 5, 8, 2] then 3, 5, 10, 9, 4", []int{4, 5, 5, 8, 8}, stream(3, []int{4, 5, 8, 2}, []int{3, 5, 10, 9, 4})),
			tc("k = 1 over [] then 1, 2, 0", []int{1, 2, 2}, stream(1, []int{}, []int{1, 2, 0})),
			tc("k = 2 over [7] then 5, 5", []int{5, 5}, stream(2, []int{7}, []int{5, 5})),
		}
	})
}
