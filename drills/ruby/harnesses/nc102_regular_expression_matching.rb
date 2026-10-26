need :is_match

tc 'is_match("aa", "a")', false, is_match("aa", "a")
tc 'is_match("aa", "a*")', true, is_match("aa", "a*")
tc 'is_match("ab", ".*")', true, is_match("ab", ".*")
tc 'is_match("aab", "c*a*b")', true, is_match("aab", "c*a*b")
tc 'is_match("mississippi", "mis*is*p*.")', false, is_match("mississippi", "mis*is*p*.")
tc 'is_match("", ".*")', true, is_match("", ".*")
tc 'is_match("", "")', true, is_match("", "")
tc 'is_match("abc", "abc")', true, is_match("abc", "abc")
