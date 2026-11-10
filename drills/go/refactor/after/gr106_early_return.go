package main

func validate(name string, age int) string {
	if name == "" {
		return "missing name"
	}
	if age < 0 {
		return "negative age"
	}
	if age >= 150 {
		return "age too large"
	}
	return "ok"
}
