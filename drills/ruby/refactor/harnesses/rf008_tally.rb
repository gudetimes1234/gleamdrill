need :letter_counts

tc 'letter_counts("hello")', { "h" => 1, "e" => 1, "l" => 2, "o" => 1 }, letter_counts("hello")
tc 'letter_counts("")', {}, letter_counts("")
tc 'letter_counts("aaa")', { "a" => 3 }, letter_counts("aaa")
uses(/\.tally\b/, "tally")
avoids(/Hash\.new/, "Hash.new(0) counter")
avoids(/\+=/, "manual counting")
