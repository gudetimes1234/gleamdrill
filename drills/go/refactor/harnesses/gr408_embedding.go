package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`start(newService("db"))`, "[db] db started", start(newService("db"))),
			tc(`newService("api").Log("ready")`, "[api] ready", newService("api").Log("ready")),
			tc(`newService("").Log("")`, "[] ", newService("").Log("")),
			uses(`(?m)^\s+\*?Logger\s*$`, "an embedded Logger"),
			avoids(`func\s*\(\s*\w+\s+\*?Service\s*\)\s*Log\(`, "a hand-written Log that forwards"),
		}
	})
}
