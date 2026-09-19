package main

func findOrder(numCourses int, prerequisites [][]int) []int {
	indegree := make([]int, numCourses)
	next := make([][]int, numCourses)
	for _, p := range prerequisites {
		next[p[1]] = append(next[p[1]], p[0])
		indegree[p[0]]++
	}
	// Kahn's algorithm; the order the courses leave the queue is a valid
	// schedule, and a short one means a cycle.
	queue := []int{}
	for course, n := range indegree {
		if n == 0 {
			queue = append(queue, course)
		}
	}
	order := []int{}
	for len(queue) > 0 {
		course := queue[0]
		queue = queue[1:]
		order = append(order, course)
		for _, dependent := range next[course] {
			indegree[dependent]--
			if indegree[dependent] == 0 {
				queue = append(queue, dependent)
			}
		}
	}
	if len(order) != numCourses {
		return []int{}
	}
	return order
}
