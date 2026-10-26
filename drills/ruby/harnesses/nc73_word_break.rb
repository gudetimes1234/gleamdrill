need :word_break

tc 'word_break("leetcode", ["leet", "code"])', true, word_break("leetcode", ["leet", "code"])
tc 'word_break("applepenapple", ["apple", "pen"])', true, word_break("applepenapple", ["apple", "pen"])
tc 'word_break("catsandog", ["cats", "dog", "sand", "and", "cat"])', false,
   word_break("catsandog", ["cats", "dog", "sand", "and", "cat"])
tc 'word_break("", ["a"])', true, word_break("", ["a"])
tc 'word_break("a", [])', false, word_break("a", [])
tc 'word_break("aaaaaaa", ["aaa", "aaaa"])', true, word_break("aaaaaaa", ["aaa", "aaaa"])
