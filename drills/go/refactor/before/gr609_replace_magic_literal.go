package main

func lateFee(daysLate int) int {
	if daysLate <= 3 {
		return 0
	}
	return (daysLate - 3) * 25
}
