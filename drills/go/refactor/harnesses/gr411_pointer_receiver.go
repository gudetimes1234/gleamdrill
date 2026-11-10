package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`balanceAfter([]int{10, 20, 5})`, 35, balanceAfter([]int{10, 20, 5})),
			tc(`balanceAfter([]int{-5, 5})`, 0, balanceAfter([]int{-5, 5})),
			tc(`balanceAfter(nil)`, 0, balanceAfter(nil)),
			uses(`func\s*\(\s*\w+\s+\*Account\s*\)`, "a pointer receiver"),
			avoids(`=\s*\w+\.Deposit\(`, "reassigning the returned copy"),
		}
	})
}
