need :num_distinct

tc 'num_distinct("rabbbit", "rabbit")', 3, num_distinct("rabbbit", "rabbit")
tc 'num_distinct("babgbag", "bag")', 5, num_distinct("babgbag", "bag")
tc 'num_distinct("", "a")', 0, num_distinct("", "a")
tc 'num_distinct("a", "")', 1, num_distinct("a", "")
tc 'num_distinct("abc", "abc")', 1, num_distinct("abc", "abc")
tc 'num_distinct("aaa", "aa")', 3, num_distinct("aaa", "aa")
