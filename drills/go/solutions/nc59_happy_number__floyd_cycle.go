package main

func isHappy(n int) bool {
	// The sequence either reaches 1 (and stays) or loops: tortoise and
	// hare detect the loop with no set at all.
	slow, fast := n, digitSquareSum(n)
	for fast != 1 && slow != fast {
		slow = digitSquareSum(slow)
		fast = digitSquareSum(digitSquareSum(fast))
	}
	return fast == 1
}

func digitSquareSum(n int) int {
	total := 0
	for n > 0 {
		total += (n % 10) * (n % 10)
		n /= 10
	}
	return total
}
