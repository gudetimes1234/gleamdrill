need :by_initial

tc 'by_initial(%w[ann bob amy])', { "a" => %w[ann amy], "b" => %w[bob] }, by_initial(%w[ann bob amy])
tc "by_initial([])", {}, by_initial([])
uses(/\.group_by\b/, "group_by")
avoids(/\.each\b/, "each loop")
avoids(/<</, "pushing into groups by hand")
