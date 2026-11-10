package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`rank([{ann 3} {bob 5} {cy 3}])`, []string{"bob", "ann", "cy"}, rankedNames([]Player{{"ann", 3}, {"bob", 5}, {"cy", 3}})),
			tc(`rank([{zoe 1} {amy 1}]) -- tie, by name`, []string{"amy", "zoe"}, rankedNames([]Player{{"zoe", 1}, {"amy", 1}})),
			tc(`rank([{dan 0} {eve 9} {fay 4}])`, []string{"eve", "fay", "dan"}, rankedNames([]Player{{"dan", 0}, {"eve", 9}, {"fay", 4}})),
			tc(`rank([])`, []string{}, rankedNames([]Player{})),
			uses(`slices\.Sort(Stable)?Func\(`, "slices.SortFunc"),
			avoids(`sort\.Slice`, "sort.Slice"),
		}
	})
}

func rankedNames(players []Player) []string {
	rank(players)
	names := []string{}
	for _, p := range players {
		names = append(names, p.Name)
	}
	return names
}
