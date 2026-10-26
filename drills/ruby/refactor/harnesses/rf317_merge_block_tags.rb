need :merge_tags

before = { "post1" => ["ruby"], "post2" => ["gleam"] }
after = { "post2" => ["gleam", "beam"], "post3" => ["go"] }
tc "merge_tags(before, after)", { "post1" => ["ruby"], "post2" => ["gleam", "beam"], "post3" => ["go"] }, merge_tags(before, after)
tc "merge_tags({}, after)", { "post2" => ["gleam", "beam"], "post3" => ["go"] }, merge_tags({}, after)
tc "merge_tags(before, {})", { "post1" => ["ruby"], "post2" => ["gleam"] }, merge_tags(before, {})
uses(/\.merge\s*\([^)]*\)\s*(\{|do\b)/, "merge with a block")
avoids(/\.each\b/, "each loop")
