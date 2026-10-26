need :first_long_word

tc 'first_long_word(%w[a ruby gem enumerable], 4)', "ruby", first_long_word(%w[a ruby gem enumerable], 4)
tc 'first_long_word(%w[a an], 5) -- no match', nil, first_long_word(%w[a an], 5)
tc "first_long_word([], 1)", nil, first_long_word([], 1)
uses(/\.(find|detect)\b/, "find")
avoids(/\bwhile\b/, "while loop")
avoids(/\bbreak\b/, "break")
