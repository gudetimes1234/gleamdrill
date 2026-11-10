package main

func allTags(base, extra []string) []string {
	tags := []string{}
	for _, t := range base {
		tags = append(tags, t)
	}
	for _, t := range extra {
		tags = append(tags, t)
	}
	return tags
}
