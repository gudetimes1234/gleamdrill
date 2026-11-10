package main

func expire(sessions map[string]int, now int) {
	var stale []string
	for id, until := range sessions {
		if until <= now {
			stale = append(stale, id)
		}
	}
	for _, id := range stale {
		delete(sessions, id)
	}
}
