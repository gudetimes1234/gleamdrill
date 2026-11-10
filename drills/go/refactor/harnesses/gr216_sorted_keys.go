package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`inventory({"pear": 2, "apple": 5})`, []string{"apple: 5", "pear: 2"}, inventory(map[string]int{"pear": 2, "apple": 5})),
			tc(`inventory({"c": 1, "a": 0, "b": 7})`, []string{"a: 0", "b: 7", "c: 1"}, inventory(map[string]int{"c": 1, "a": 0, "b": 7})),
			tc(`inventory({"fig": 3})`, []string{"fig: 3"}, inventory(map[string]int{"fig": 3})),
			tc(`inventory({}) -- empty`, []string{}, inventory(map[string]int{})),
			uses(`slices\.Sort\(`, "slices.Sort"),
			avoids(`\bsort\.`, "the sort package"),
		}
	})
}
