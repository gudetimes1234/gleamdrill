package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc(`localServer()`, Server{Host: "localhost", Port: 8080, Timeout: 30}, localServer()),
			tc(`testServer()`, Server{Host: "127.0.0.1", Port: 8080, Timeout: 30}, testServer()),
			tc(`publicServer("example.com")`, Server{Host: "example.com", Port: 8080, Timeout: 30}, publicServer("example.com")),
			tc(`publicServer("")`, Server{Port: 8080, Timeout: 30}, publicServer("")),
			uses(`func\s+New\w*\(`, "a NewServer constructor"),
			avoids(`(?s)8080.*8080`, "the defaults repeated in every literal"),
		}
	})
}
