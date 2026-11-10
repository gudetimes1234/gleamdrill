package main

func canVote(age int, citizen bool) bool {
	if citizen && age >= 18 {
		return true
	}
	return false
}
