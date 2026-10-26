need :count_substrings

tc 'count_substrings("abc")', 3, count_substrings("abc")
tc 'count_substrings("aaa")', 6, count_substrings("aaa")
tc 'count_substrings("")', 0, count_substrings("")
tc 'count_substrings("a")', 1, count_substrings("a")
tc 'count_substrings("aba")', 4, count_substrings("aba")
tc 'count_substrings("abccba")', 9, count_substrings("abccba")
