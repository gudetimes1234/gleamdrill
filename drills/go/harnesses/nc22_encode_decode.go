package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("decode(encode(['lint','code','love','you']))", []string{"lint", "code", "love", "you"}, decode(encode([]string{"lint", "code", "love", "you"}))),
			tc("decode(encode(['we','say',':','yes']))", []string{"we", "say", ":", "yes"}, decode(encode([]string{"we", "say", ":", "yes"}))),
			tc("decode(encode(['']))", []string{""}, decode(encode([]string{""}))),
			tc("decode(encode([]))", []string{}, decode(encode([]string{}))),
			tc("decode(encode(['a#b,c', '3#', '']))", []string{"a#b,c", "3#", ""}, decode(encode([]string{"a#b,c", "3#", ""}))),
		}
	})
}
