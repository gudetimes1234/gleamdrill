package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findCheapestPrice(4, the loop example, 0, 3, 1)", 700, findCheapestPrice(4, [][]int{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}, 0, 3, 1)),
			tc("findCheapestPrice(3, two hops allowed, 0, 2, 1)", 200, findCheapestPrice(3, [][]int{{0, 1, 100}, {1, 2, 100}, {0, 2, 500}}, 0, 2, 1)),
			tc("findCheapestPrice(3, no stop allowed, 0, 2, 0)", 500, findCheapestPrice(3, [][]int{{0, 1, 100}, {1, 2, 100}, {0, 2, 500}}, 0, 2, 0)),
			tc("findCheapestPrice(2, no flights at all, 0, 1, 5)", -1, findCheapestPrice(2, [][]int{}, 0, 1, 5)),
			tc("findCheapestPrice(1, already there, 0, 0, 0)", 0, findCheapestPrice(1, [][]int{}, 0, 0, 0)),
			tc("findCheapestPrice(5, cheapest route needs the third hop, 0, 2, 2)", 7, findCheapestPrice(5, [][]int{{0, 1, 5}, {1, 2, 5}, {0, 3, 2}, {3, 1, 2}, {1, 4, 1}, {4, 2, 1}}, 0, 2, 2)),
		}
	})
}
