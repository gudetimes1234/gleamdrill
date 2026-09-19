package main

type entry struct {
	timestamp int
	value     string
}

// Walk each key's history from the newest entry back to the first one that
// is not after the asked-for time. Linear per lookup, but no ordering
// assumption is needed beyond append order.
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
	for i := len(entries) - 1; i >= 0; i-- {
		if entries[i].timestamp <= timestamp {
			return entries[i].value
		}
	}
	return ""
}
