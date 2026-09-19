package main

func isHappy(n int) bool {
	seen := map[int]bool{}
	for n != 1 && !seen[n] {
		seen[n] = true
		n = digitSquareSum(n)
	}
	return n == 1
}

func digitSquareSum(n int) int {
	total := 0
	for n > 0 {
		total += (n % 10) * (n % 10)
		n /= 10
	}
	return total
}
