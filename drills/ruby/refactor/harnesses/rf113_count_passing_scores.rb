need :passing_count

tc "passing_count([55, 70, 90, 40], 60)", 2, passing_count([55, 70, 90, 40], 60)
tc "passing_count([60], 60) -- the mark itself passes", 1, passing_count([60], 60)
tc "passing_count([], 50)", 0, passing_count([], 50)
uses(/\.count\s*(\{|do\b)/, "count with a block")
avoids(/\.each\b/, "each loop")
avoids(/\+=/, "manual counter")
