package main

type Weekday int

const (
	Monday    Weekday = 0
	Tuesday   Weekday = 1
	Wednesday Weekday = 2
	Thursday  Weekday = 3
	Friday    Weekday = 4
)

func isMidweek(d Weekday) bool {
	return d == Tuesday || d == Wednesday || d == Thursday
}
