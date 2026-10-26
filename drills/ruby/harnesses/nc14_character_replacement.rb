need :character_replacement

tc 'character_replacement("ABAB", 2)', 4, character_replacement("ABAB", 2)
tc 'character_replacement("AABABBA", 1)', 4, character_replacement("AABABBA", 1)
tc 'character_replacement("AAAA", 0)', 4, character_replacement("AAAA", 0)
