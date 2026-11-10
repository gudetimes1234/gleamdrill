package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`statusText(200)`, "OK", statusText(200)),
			tc(`statusText(404)`, "Not Found", statusText(404)),
			tc(`statusText(503)`, "Service Unavailable", statusText(503)),
			tc(`statusText(418) -- not in the table`, "Unknown", statusText(418)),
			tc(`statusText(0)`, "Unknown", statusText(0)),
			uses(`map\[int\]string\s*\{`, "a map literal"),
			avoids(`\bswitch\b`, "a switch"),
		}
	})
}
