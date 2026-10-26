need :count_adults

tc "count_adults([12, 18, 40, 17])", 2, count_adults([12, 18, 40, 17])
tc "count_adults([])", 0, count_adults([])
tc "count_adults([5, 6]) -- nobody", 0, count_adults([5, 6])
uses(/\.count\s*(\{|do)/, "count with a block")
avoids(/\.each\b/, "each loop")
avoids(/\+=/, "manual counter")
