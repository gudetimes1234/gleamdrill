package main

func main() {
	run(func() []testCase {
		a := []int{5, 3, 9, 1}
		sortScores(a)
		b := []int{2, -4, 2, 0}
		sortScores(b)
		c := []int{7}
		sortScores(c)
		d := []int{}
		sortScores(d)
		return []testCase{
			tc(`sortScores([]int{5, 3, 9, 1})`, []int{1, 3, 5, 9}, a),
			tc(`sortScores([]int{2, -4, 2, 0}) -- duplicates and negatives`, []int{-4, 0, 2, 2}, b),
			tc(`sortScores([]int{7})`, []int{7}, c),
			tc(`sortScores([]int{})`, []int{}, d),
			uses(`slices\.Sort\(`, "slices.Sort"),
			avoids(`\bfor\b`, "a hand-written sort loop"),
		}
	})
}
