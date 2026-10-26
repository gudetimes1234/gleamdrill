need :squares

tc "squares([1, 2, 3])", { 1 => 1, 2 => 4, 3 => 9 }, squares([1, 2, 3])
tc "squares([])", {}, squares([])
uses(/\.to_h\s*(\{|do)/, "to_h with a block")
avoids(/\.each\b/, "each loop")
