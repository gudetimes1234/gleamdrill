package main

func canFinish(numCourses int, prerequisites [][]int) bool {
	next := make([][]int, numCourses)
	for _, p := range prerequisites {
		next[p[1]] = append(next[p[1]], p[0])
	}
	// Three colours: unvisited, on the current path, finished. Reaching a
	// node on the current path is a cycle.
	const unvisited, onPath, done = 0, 1, 2
	colour := make([]int, numCourses)
	var acyclic func(course int) bool
	acyclic = func(course int) bool {
		switch colour[course] {
		case onPath:
			return false
		case done:
			return true
		}
		colour[course] = onPath
		for _, dependent := range next[course] {
			if !acyclic(dependent) {
				return false
			}
		}
		colour[course] = done
		return true
	}
	for course := 0; course < numCourses; course++ {
		if !acyclic(course) {
			return false
		}
	}
	return true
}
