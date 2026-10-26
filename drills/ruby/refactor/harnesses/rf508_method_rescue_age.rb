need :parse_age

tc 'parse_age("42")', 42, parse_age("42")
tc 'parse_age("4x") -- not a number', nil, parse_age("4x")
tc 'parse_age("") -- empty', nil, parse_age("")
tc "parse_age(nil) -- TypeError, also caught", nil, parse_age(nil)
uses(/^\s*rescue\b/, "rescue")
avoids(/\bbegin\b/, "begin")
