need :min_window

tc 'min_window("ADOBECODEBANC", "ABC")', "BANC", min_window("ADOBECODEBANC", "ABC")
tc 'min_window("a", "a")', "a", min_window("a", "a")
tc 'min_window("a", "aa")', "", min_window("a", "aa")
tc 'min_window("", "a")', "", min_window("", "a")
tc 'min_window("ab", "")', "", min_window("ab", "")
tc 'min_window("aaflslflsldkalskaaa", "aaa")', "aaa", min_window("aaflslflsldkalskaaa", "aaa")
