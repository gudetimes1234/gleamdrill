package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("partitionLabels('ababcbacadefegdehijhklij')", []int{9, 7, 8}, partitionLabels("ababcbacadefegdehijhklij")),
			tc("partitionLabels('eccbbbbdec')", []int{10}, partitionLabels("eccbbbbdec")),
			tc("partitionLabels('abc')", []int{1, 1, 1}, partitionLabels("abc")),
			tc("partitionLabels('a')", []int{1}, partitionLabels("a")),
		}
	})
}
