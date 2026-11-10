package main

func allTags(base, extra []string) []string {
	tags := make([]string, 0, len(base)+len(extra))
	tags = append(tags, base...)
	return append(tags, extra...)
}
