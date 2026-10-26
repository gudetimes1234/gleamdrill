need :largest_file

tc 'largest_file({ "a.log" => 120, "b.iso" => 4096, "c.txt" => 8 })', "b.iso", largest_file({ "a.log" => 120, "b.iso" => 4096, "c.txt" => 8 })
tc "largest_file({}) -- nothing is nil", nil, largest_file({})
tc 'largest_file({ "empty" => 0 })', "empty", largest_file({ "empty" => 0 })
uses(/\.max_by\b/, "max_by")
avoids(/\.each\b/, "each loop")
avoids(/=\s*-1\b|\bif\b/, "best-so-far bookkeeping")
