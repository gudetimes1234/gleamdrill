need :greet

tc 'greet("Ada")', "Hello, Ada!", greet("Ada")
tc 'greet("Bo", greeting: "Hi")', "Hi, Bo!", greet("Bo", greeting: "Hi")
tc 'greet("Cy", mark: "?")', "Hello, Cy?", greet("Cy", mark: "?")
tc 'greet("", greeting: "Hey", mark: ".") -- empty name', "Hey, .", greet("", greeting: "Hey", mark: ".")
uses(/def\s+greet\([^)]*\w+:/, "keyword arguments")
avoids(/\.fetch\b|\[:\w+\]/, "pulling options out of a hash")
