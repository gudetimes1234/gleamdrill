package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`countVowels("banana")`, 3, countVowels("banana")),
			tc(`countVowels("education")`, 5, countVowels("education")),
			tc(`countVowels("rhythm") -- none`, 0, countVowels("rhythm")),
			tc(`countVowels("")`, 0, countVowels("")),
			uses(`\bcase\b[^:\n]*,|strings\.(ContainsRune|IndexRune)\(`, "a case list"),
			avoids(`\|\|`, "an || chain"),
		}
	})
}
