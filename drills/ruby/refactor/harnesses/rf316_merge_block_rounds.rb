need :best_of

r1 = { "ann" => 7, "bo" => 4 }
r2 = { "bo" => 9, "cy" => 5 }
tc "best_of(r1, r2)", { "ann" => 7, "bo" => 9, "cy" => 5 }, best_of(r1, r2)
tc "best_of(r1, {})", { "ann" => 7, "bo" => 4 }, best_of(r1, {})
tc "best_of({}, {})", {}, best_of({}, {})
uses(/\.merge\s*\([^)]*\)\s*(\{|do\b)/, "merge with a block")
avoids(/\.keys\b|\.each\b/, "walking the keys")
