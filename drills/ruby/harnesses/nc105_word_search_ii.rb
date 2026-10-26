need :find_words

def board = ["oaan", "etae", "ihkr", "iflv"].map(&:chars)

tc 'find_words(board, ["oath", "pea", "eat", "rain"])', ["eat", "oath"], find_words(board, ["oath", "pea", "eat", "rain"]).sort
tc 'find_words([["a", "b"], ["c", "d"]], ["abcb"])', [], find_words([["a", "b"], ["c", "d"]], ["abcb"]).sort
tc 'find_words([["a"]], ["a"])', ["a"], find_words([["a"]], ["a"]).sort
tc "find_words(board, [])", [], find_words(board, []).sort
tc 'find_words([], ["a"])', [], find_words([], ["a"]).sort
