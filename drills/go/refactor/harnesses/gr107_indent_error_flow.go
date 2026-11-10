package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`parsePort("8080")`, []any{8080, ""}, portResult("8080")),
			tc(`parsePort("0")`, []any{0, "port out of range"}, portResult("0")),
			tc(`parsePort("65536")`, []any{0, "port out of range"}, portResult("65536")),
			tc(`parsePort("http")`, []any{0, `strconv.Atoi: parsing "http": invalid syntax`}, portResult("http")),
			tc(`parsePort("") -- empty`, []any{0, `strconv.Atoi: parsing "": invalid syntax`}, portResult("")),
			avoids(`err\s*==\s*nil`, "an err == nil branch"),
			avoids(`\belse\b`, "else branches"),
		}
	})
}

func portResult(s string) []any {
	n, err := parsePort(s)
	msg := ""
	if err != nil {
		msg = err.Error()
	}
	return []any{n, msg}
}
