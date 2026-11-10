package main

import "bytes"

func reportOf(items []string) string {
	var buf bytes.Buffer
	writeReport(&buf, items)
	return buf.String()
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`writeReport(&buf, []string{"eggs", "milk"})`, "1. eggs\n2. milk\n", reportOf([]string{"eggs", "milk"})),
			tc(`writeReport(&buf, []string{"tea"})`, "1. tea\n", reportOf([]string{"tea"})),
			tc(`writeReport(&buf, nil)`, "", reportOf(nil)),
			uses(`\bio\.Writer\b`, "an io.Writer parameter"),
			avoids(`\*bytes\.Buffer`, "a concrete *bytes.Buffer parameter"),
		}
	})
}
