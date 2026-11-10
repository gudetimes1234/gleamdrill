package main

func canVote(age int, citizen bool) bool {
	return citizen && age >= 18
}
