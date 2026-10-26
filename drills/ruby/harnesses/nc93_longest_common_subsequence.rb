need :longest_common_subsequence

tc 'longest_common_subsequence("abcde", "ace")', 3, longest_common_subsequence("abcde", "ace")
tc 'longest_common_subsequence("abc", "abc")', 3, longest_common_subsequence("abc", "abc")
tc 'longest_common_subsequence("abc", "def")', 0, longest_common_subsequence("abc", "def")
tc 'longest_common_subsequence("", "abc")', 0, longest_common_subsequence("", "abc")
tc 'longest_common_subsequence("bsbininm", "jmjkbkjkv")', 1, longest_common_subsequence("bsbininm", "jmjkbkjkv")
tc 'longest_common_subsequence("ezupkr", "ubmrapg")', 2, longest_common_subsequence("ezupkr", "ubmrapg")
