need :is_anagram

tc 'is_anagram("anagram", "nagaram")', true, is_anagram("anagram", "nagaram")
tc 'is_anagram("rat", "car")', false, is_anagram("rat", "car")
tc 'is_anagram("", "")', true, is_anagram("", "")
tc 'is_anagram("a", "ab")', false, is_anagram("a", "ab")
