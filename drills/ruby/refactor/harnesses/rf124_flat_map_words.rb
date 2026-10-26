need :words_in

tc 'words_in(["to be", "or not to be"])', ["to", "be", "or", "not", "to", "be"], words_in(["to be", "or not to be"])
tc 'words_in(["", "  hi  "]) -- blank lines give nothing', ["hi"], words_in(["", "  hi  "])
tc "words_in([])", [], words_in([])
uses(/\.flat_map\b/, "flat_map")
avoids(/\.each\b/, "each loop")
avoids(/\.concat\b|\+=/, "concatenating by hand")
