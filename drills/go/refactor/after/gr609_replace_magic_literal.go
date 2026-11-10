package main

const (
	graceDays = 3
	feePerDay = 25
)

func lateFee(daysLate int) int {
	if daysLate <= graceDays {
		return 0
	}
	return (daysLate - graceDays) * feePerDay
}
