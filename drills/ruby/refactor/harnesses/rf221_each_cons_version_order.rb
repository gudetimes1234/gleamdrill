need :ascending?

tc "ascending?([1, 4, 9])", true, ascending?([1, 4, 9])
tc "ascending?([1, 4, 4]) -- a repeat is not ascending", false, ascending?([1, 4, 4])
tc "ascending?([3, 1, 2])", false, ascending?([3, 1, 2])
tc "ascending?([]) -- vacuously true", true, ascending?([])
uses(/\.each_cons\b/, "each_cons")
avoids(/\bwhile\b/, "while loop")
avoids(/\b(true|false)\b/, "a flag variable")
