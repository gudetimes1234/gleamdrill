need :greeting

tc 'greeting("Ann", 3)', "Hello, Ann! You have 3 new messages.", greeting("Ann", 3)
tc 'greeting("Bo", 0)', "Hello, Bo! You have 0 new messages.", greeting("Bo", 0)
uses(/#\{/, "interpolation")
avoids(/\.to_s\b/, "to_s (interpolation calls it)")
avoids(/"\s*\+|\+\s*"/, "string +")
