package main

func topKFrequent(nums []int, k int) []int {
	counts := map[int]int{}
	for _, n := range nums {
		counts[n]++
	}
	// A count can never exceed the input length, so one bucket per frequency
	// covers everything and the answer falls out of a single downward walk.
	buckets := make([][]int, len(nums)+1)
	for n, count := range counts {
		buckets[count] = append(buckets[count], n)
	}
	result := []int{}
	for count := len(buckets) - 1; count > 0; count-- {
		for _, n := range buckets[count] {
			result = append(result, n)
			if len(result) == k {
				return result
			}
		}
	}
	return result
}
