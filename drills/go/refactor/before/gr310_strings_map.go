package main

func maskDigits(s string) string {
	out := ""
	for _, r := range s {
		if r >= '0' && r <= '9' {
			out += "*"
		} else {
			out += string(r)
		}
	}
	return out
}
