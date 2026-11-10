package main

func expire(sessions map[string]int, now int) {
	for id, until := range sessions {
		if until <= now {
			delete(sessions, id)
		}
	}
}
