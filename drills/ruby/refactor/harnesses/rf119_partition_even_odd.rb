need :split_even_odd

tc "split_even_odd([1, 2, 3, 4, 6])", [[2, 4, 6], [1, 3]], split_even_odd([1, 2, 3, 4, 6])
tc "split_even_odd([0]) -- zero is even", [[0], []], split_even_odd([0])
tc "split_even_odd([])", [[], []], split_even_odd([])
uses(/\.partition\b/, "partition")
avoids(/\.each\b/, "each loop")
avoids(/<<|\.push\b/, "pushing into two arrays")
