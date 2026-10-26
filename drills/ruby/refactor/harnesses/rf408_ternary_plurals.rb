need :pluralize

tc 'pluralize(1, "cat")', "1 cat", pluralize(1, "cat")
tc 'pluralize(3, "cat")', "3 cats", pluralize(3, "cat")
tc 'pluralize(0, "file") -- zero is plural', "0 files", pluralize(0, "file")
uses(/\S\s+\?\s+\S[^\n]*\s:\s/, "a ternary")
avoids(/\bif\b/, "if")
