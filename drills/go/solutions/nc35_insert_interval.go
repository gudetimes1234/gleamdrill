package main

func insert(intervals [][]int, newInterval []int) [][]int {
	result := [][]int{}
	i := 0
	// Everything that ends before the new one starts is untouched.
	for i < len(intervals) && intervals[i][1] < newInterval[0] {
		result = append(result, intervals[i])
		i++
	}
	// Everything overlapping the new one is absorbed into it.
	merged := []int{newInterval[0], newInterval[1]}
	for i < len(intervals) && intervals[i][0] <= merged[1] {
		merged[0] = min(merged[0], intervals[i][0])
		merged[1] = max(merged[1], intervals[i][1])
		i++
	}
	result = append(result, merged)
	return append(result, intervals[i:]...)
}
