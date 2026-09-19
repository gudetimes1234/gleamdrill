package main

import "sort"

type entry struct {
	timestamp int
	value     string
}

// Timestamps arrive in increasing order, so each key's history is already
// sorted and a lookup is a binary search for the last entry at or before
// the asked-for time.
type TimeMap struct {
	history map[string][]entry
}

func Constructor() TimeMap {
	return TimeMap{history: map[string][]entry{}}
}

func (m *TimeMap) Set(key string, value string, timestamp int) {
	m.history[key] = append(m.history[key], entry{timestamp, value})
}

func (m *TimeMap) Get(key string, timestamp int) string {
	entries := m.history[key]
	i := sort.Search(len(entries), func(i int) bool { return entries[i].timestamp > timestamp })
	if i == 0 {
		return ""
	}
	return entries[i-1].value
}
