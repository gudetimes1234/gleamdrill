package main

func validate(name string, age int) string {
	if name != "" {
		if age >= 0 {
			if age < 150 {
				return "ok"
			} else {
				return "age too large"
			}
		} else {
			return "negative age"
		}
	} else {
		return "missing name"
	}
}
