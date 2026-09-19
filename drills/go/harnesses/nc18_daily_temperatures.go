package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("dailyTemperatures([73,74,75,71,69,72,76,73])", []int{1, 1, 4, 2, 1, 1, 0, 0}, dailyTemperatures([]int{73, 74, 75, 71, 69, 72, 76, 73})),
			tc("dailyTemperatures([30,40,50,60])", []int{1, 1, 1, 0}, dailyTemperatures([]int{30, 40, 50, 60})),
			tc("dailyTemperatures([30,60,90])", []int{1, 1, 0}, dailyTemperatures([]int{30, 60, 90})),
			tc("dailyTemperatures([90])", []int{0}, dailyTemperatures([]int{90})),
		}
	})
}
