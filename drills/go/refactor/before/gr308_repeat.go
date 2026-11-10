package main

func progressBar(done, total int) string {
	bar := "["
	for i := 0; i < done; i++ {
		bar += "#"
	}
	for i := done; i < total; i++ {
		bar += "-"
	}
	return bar + "]"
}
