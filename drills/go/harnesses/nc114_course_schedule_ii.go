package main

// Any order that respects the prerequisites is right, so check the order
// rather than compare it to one answer.
func valid(numCourses int, prerequisites [][]int) bool {
	order := findOrder(numCourses, prerequisites)
	if len(order) != numCourses {
		return false
	}
	position := map[int]int{}
	for i, course := range order {
		position[course] = i
	}
	for _, p := range prerequisites {
		if position[p[1]] > position[p[0]] {
			return false
		}
	}
	return true
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findOrder(2, [[1,0]])", []int{0, 1}, findOrder(2, [][]int{{1, 0}})),
			tc("findOrder(4, [[1,0],[2,0],[3,1],[3,2]]) is a valid order", true, valid(4, [][]int{{1, 0}, {2, 0}, {3, 1}, {3, 2}})),
			tc("findOrder(1, [])", []int{0}, findOrder(1, [][]int{})),
			tc("findOrder(2, [[1,0],[0,1]]) -- a cycle", []int{}, findOrder(2, [][]int{{1, 0}, {0, 1}})),
			tc("findOrder(3, []) is a valid order", true, valid(3, [][]int{})),
		}
	})
}
