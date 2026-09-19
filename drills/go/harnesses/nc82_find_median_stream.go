package main

func medians(values []int) []float64 {
	finder := Constructor()
	out := []float64{}
	for _, v := range values {
		finder.AddNum(v)
		out = append(out, finder.FindMedian())
	}
	return out
}

func main() {
	run(func() []testCase {
		empty := Constructor()
		return []testCase{
			tc("medians of 1, 2, 3", []float64{1, 1.5, 2}, medians([]int{1, 2, 3})),
			tc("medians of 1, 2, 3, 4, 5", []float64{1, 1.5, 2, 2.5, 3}, medians([]int{1, 2, 3, 4, 5})),
			tc("medians arriving out of order", []float64{5, 3, 2, 2.5}, medians([]int{5, 1, 2, 3})),
			tc("medians of negatives", []float64{-1, -1.5}, medians([]int{-1, -2})),
			tc("median before anything is added", 0.0, empty.FindMedian()),
		}
	})
}
