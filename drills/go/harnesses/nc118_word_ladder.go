package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("ladderLength('hit','cog', full list)", 5, ladderLength("hit", "cog", []string{"hot", "dot", "dog", "lot", "log", "cog"})),
			tc("ladderLength('hit','cog', without cog)", 0, ladderLength("hit", "cog", []string{"hot", "dot", "dog", "lot", "log"})),
			tc("ladderLength('a','c', ['a','b','c'])", 2, ladderLength("a", "c", []string{"a", "b", "c"})),
			tc("ladderLength('hit','hit', ['hit'])", 1, ladderLength("hit", "hit", []string{"hit"})),
			tc("ladderLength('hot','dog', ['hot','dog']) -- no bridge", 0, ladderLength("hot", "dog", []string{"hot", "dog"})),
		}
	})
}
