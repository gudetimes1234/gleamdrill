package main

func twoSum(numbers []int, target int) []int {
	left, right := 0, len(numbers)-1
	for left < right {
		total := numbers[left] + numbers[right]
		switch {
		case total == target:
			return []int{left + 1, right + 1}
		case total < target:
			left++
		default:
			right--
		}
	}
	return []int{}
}
