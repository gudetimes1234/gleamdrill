need :long_words

tc 'long_words(%w[a tree is green], 4)', %w[tree green], long_words(%w[a tree is green], 4)
tc "long_words([], 1)", [], long_words([], 1)
tc 'long_words(%w[hi], 3) -- nothing long enough', [], long_words(%w[hi], 3)
uses(/\.(select|filter)\b/, "select")
avoids(/\.each\b/, "each loop")
avoids(/<<|\.push\b/, "pushing into an accumulator")
