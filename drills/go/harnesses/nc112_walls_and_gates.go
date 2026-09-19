package main

func filled(rooms [][]int) [][]int {
	wallsAndGates(rooms)
	return rooms
}

func main() {
	run(func() []testCase {
		const far = 2147483647
		return []testCase{
			tc("wallsAndGates(the classic 4x4)", [][]int{{3, -1, 0, 1}, {2, 2, 1, -1}, {1, -1, 2, -1}, {0, -1, 3, 4}}, filled([][]int{{far, -1, 0, far}, {far, far, far, -1}, {far, -1, far, -1}, {0, -1, far, far}})),
			tc("wallsAndGates([[0]])", [][]int{{0}}, filled([][]int{{0}})),
			tc("wallsAndGates([[-1]])", [][]int{{-1}}, filled([][]int{{-1}})),
			tc("wallsAndGates([])", [][]int{}, filled([][]int{})),
			tc("wallsAndGates(no gate at all)", [][]int{{far, far}}, filled([][]int{{far, far}})),
		}
	})
}
