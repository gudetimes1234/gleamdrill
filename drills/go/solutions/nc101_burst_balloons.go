package main

func maxCoins(nums []int) int {
	// Pad with 1s; best[l][r] is the most from bursting everything
	// strictly between l and r, deciding which balloon is burst LAST in
	// that range (its neighbours are then l and r themselves).
	padded := append(append([]int{1}, nums...), 1)
	n := len(padded)
	best := make([][]int, n)
	for i := range best {
		best[i] = make([]int, n)
	}
	for width := 2; width < n; width++ {
		for l := 0; l+width < n; l++ {
			r := l + width
			for k := l + 1; k < r; k++ {
				best[l][r] = max(best[l][r], best[l][k]+padded[l]*padded[k]*padded[r]+best[k][r])
			}
		}
	}
	return best[0][n-1]
}
