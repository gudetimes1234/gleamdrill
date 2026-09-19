package main

func permute(nums []int) [][]int {
	// Start from the empty permutation; each number is inserted into every
	// position of every permutation built so far.
	result := [][]int{{}}
	for _, n := range nums {
		next := [][]int{}
		for _, p := range result {
			for i := 0; i <= len(p); i++ {
				extended := make([]int, 0, len(p)+1)
				extended = append(extended, p[:i]...)
				extended = append(extended, n)
				extended = append(extended, p[i:]...)
				next = append(next, extended)
			}
		}
		result = next
	}
	return result
}
