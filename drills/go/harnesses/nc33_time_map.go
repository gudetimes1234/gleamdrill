package main

func main() {
	run(func() []testCase {
		m := Constructor()
		m.Set("foo", "bar", 1)
		atOne := m.Get("foo", 1)
		atThree := m.Get("foo", 3)
		m.Set("foo", "bar2", 4)
		return []testCase{
			tc("set foo=bar @1; get foo @1", "bar", atOne),
			tc("get foo @3 -- the latest value at or before 3", "bar", atThree),
			tc("set foo=bar2 @4; get foo @4", "bar2", m.Get("foo", 4)),
			tc("get foo @5", "bar2", m.Get("foo", 5)),
			tc("get foo @0 -- before any set", "", m.Get("foo", 0)),
			tc("get missing @1", "", m.Get("missing", 1)),
		}
	})
}
