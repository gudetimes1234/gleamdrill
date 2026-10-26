need :Trie

trie = Trie.new
trie.insert("apple")

tc 'search("apple") after inserting it', true, trie.search("apple")
tc 'search("app") -- a prefix, not a word', false, trie.search("app")
tc 'starts_with("app")', true, trie.starts_with("app")

trie.insert("app")

tc 'search("app") after inserting it too', true, trie.search("app")
tc 'starts_with("apz")', false, trie.starts_with("apz")
tc 'search("") on an empty trie', false, Trie.new.search("")
tc 'starts_with("") on an empty trie', true, Trie.new.starts_with("")
