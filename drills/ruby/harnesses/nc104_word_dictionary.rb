need :WordDictionary

dictionary = WordDictionary.new
["bad", "dad", "mad"].each { |word| dictionary.add_word(word) }

tc 'search("pad")', false, dictionary.search("pad")
tc 'search("bad")', true, dictionary.search("bad")
tc 'search(".ad")', true, dictionary.search(".ad")
tc 'search("b..")', true, dictionary.search("b..")
tc 'search("...")', true, dictionary.search("...")
tc 'search("b") -- too short', false, dictionary.search("b")
tc 'search("....") -- too long', false, dictionary.search("....")
