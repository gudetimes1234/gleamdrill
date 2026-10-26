need :word_lengths

tc 'word_lengths(%w[ruby is fun])', { "ruby" => 4, "is" => 2, "fun" => 3 }, word_lengths(%w[ruby is fun])
tc "word_lengths([])", {}, word_lengths([])
uses(/\.each_with_object\b/, "each_with_object")
avoids(/\.each\b/, "each loop")
avoids(/^\s*lengths\s*$/, "returning the accumulator by hand")
