need :letter_combinations

tc 'letter_combinations("23")', ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], letter_combinations("23").sort
tc 'letter_combinations("")', [], letter_combinations("").sort
tc 'letter_combinations("2")', ["a", "b", "c"], letter_combinations("2").sort
tc 'letter_combinations("9")', ["w", "x", "y", "z"], letter_combinations("9").sort
tc 'letter_combinations("79") count', 16, letter_combinations("79").length
