package main

func canFinish(numCourses int, prerequisites [][]int) bool {
	// Kahn's algorithm: repeatedly take a course with no remaining
	// prerequisites. If every course gets taken, there was no cycle.
	indegree := make([]int, numCourses)
	next := make([][]int, numCourses)
	for _, p := range prerequisites {
		course, prerequisite := p[0], p[1]
		next[prerequisite] = append(next[prerequisite], course)
		indegree[course]++
	}
	queue := []int{}
	for course, n := range indegree {
		if n == 0 {
			queue = append(queue, course)
		}
	}
	taken := 0
	for len(queue) > 0 {
		course := queue[0]
		queue = queue[1:]
		taken++
		for _, dependent := range next[course] {
			indegree[dependent]--
			if indegree[dependent] == 0 {
				queue = append(queue, dependent)
			}
		}
	}
	return taken == numCourses
}
