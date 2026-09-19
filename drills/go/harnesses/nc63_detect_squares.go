package main

func main() {
	run(func() []testCase {
		store := Constructor()
		store.Add([]int{3, 10})
		store.Add([]int{11, 2})
		store.Add([]int{3, 2})
		oneEach := store.Count([]int{11, 10})
		noSquare := store.Count([]int{14, 8})
		store.Add([]int{11, 2})
		return []testCase{
			tc("count([11, 10]) with one of each corner", 1, oneEach),
			tc("count([14, 8]) -- no square", 0, noSquare),
			tc("count([11, 10]) after a duplicate corner", 2, store.Count([]int{11, 10})),
			tc("count([3, 10]) -- the query point is itself stored", 0, store.Count([]int{3, 10})),
		}
	})
}
