need :is_interleave

tc 'is_interleave("aabcc", "dbbca", "aadbbcbcac")', true, is_interleave("aabcc", "dbbca", "aadbbcbcac")
tc 'is_interleave("aabcc", "dbbca", "aadbbbaccc")', false, is_interleave("aabcc", "dbbca", "aadbbbaccc")
tc 'is_interleave("", "", "")', true, is_interleave("", "", "")
tc 'is_interleave("a", "", "a")', true, is_interleave("a", "", "a")
tc 'is_interleave("", "b", "b")', true, is_interleave("", "b", "b")
tc 'is_interleave("abc", "def", "adbecf")', true, is_interleave("abc", "def", "adbecf")
