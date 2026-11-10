package main

func errText(err error) string {
	if err == nil {
		return "<nil>"
	}
	return err.Error()
}

func main() {
	run(func() []testCase {
		t := &Tickets{left: map[string]int{"opera": 1}}
		first := errText(t.Take("opera"))
		second := errText(t.Take("opera"))
		third := errText(t.Take("jazz"))
		left := t.left["opera"]
		return []testCase{
			tc(`t.Take("opera") -- one left`, "<nil>", first),
			tc(`t.Take("opera") -- again`, "sold out: opera", second),
			tc(`t.Take("jazz") -- never stocked`, "sold out: jazz", third),
			tc(`t.left["opera"] afterwards`, 0, left),
			avoids(`(?s)Unlock\(\).*Unlock\(\)`, "Unlock on more than one path"),
			uses(`defer\s+[\w.]+\.Unlock\(\)`, "defer Unlock"),
		}
	})
}
