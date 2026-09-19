package main

func findOrder(numCourses int, prerequisites [][]int) []int {
	next := make([][]int, numCourses)
	for _, p := range prerequisites {
		next[p[1]] = append(next[p[1]], p[0])
	}
	// Depth-first: a course is appended after everything that depends on
	// it, so the reversed post-order is a schedule. Path colouring finds
	// a cycle.
	const unvisited, onPath, done = 0, 1, 2
	colour := make([]int, numCourses)
	postorder := []int{}
	var visit func(course int) bool
	visit = func(course int) bool {
		switch colour[course] {
		case onPath:
			return false
		case done:
			return true
		}
		colour[course] = onPath
		for _, dependent := range next[course] {
			if !visit(dependent) {
				return false
			}
		}
		colour[course] = done
		postorder = append(postorder, course)
		return true
	}
	for course := 0; course < numCourses; course++ {
		if !visit(course) {
			return []int{}
		}
	}
	for i, j := 0, len(postorder)-1; i < j; i, j = i+1, j-1 {
		postorder[i], postorder[j] = postorder[j], postorder[i]
	}
	return postorder
}
