package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`Order{10, 50}.Price()`, 490, Order{10, 50}.Price()),
			tc(`Order{30, 50}.Price()`, 1425, Order{30, 50}.Price()),
			tc(`Order{20, 50}.Price() -- exactly 1000`, 980, Order{20, 50}.Price()),
			tc(`Order{0, 99}.Price()`, 0, Order{0, 99}.Price()),
			uses(`(?s)func\s*\(\s*\w+\s+\*?Order\s*\)\s*\w+\(\)\s*int\b.*func\s*\(\s*\w+\s+\*?Order\s*\)\s*\w+\(\)\s*int\b`, "a basePrice query method"),
			avoids(`:=`, "a temp holding the base price"),
		}
	})
}
