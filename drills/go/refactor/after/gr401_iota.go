package main

type Weekday int

const (
	Monday Weekday = iota
	Tuesday
	Wednesday
	Thursday
	Friday
)

func isMidweek(d Weekday) bool {
	return d > Monday && d < Friday
}
