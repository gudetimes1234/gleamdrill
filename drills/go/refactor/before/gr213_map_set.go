package main

func firstSeen(words []string) []string {
	var out []string
	for _, w := range words {
		dup := false
		for _, o := range out {
			if o == w {
				dup = true
				break
			}
		}
		if !dup {
			out = append(out, w)
		}
	}
	return out
}
