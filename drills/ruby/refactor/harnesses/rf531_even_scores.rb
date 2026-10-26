need :even_scores

tc "even_scores([3, 8, 10, 7])", [8, 10], even_scores([3, 8, 10, 7])
tc "even_scores([0, -4, 5]) -- zero and negatives are even", [0, -4], even_scores([0, -4, 5])
tc "even_scores([]) -- empty", [], even_scores([])
uses(/\.?even\?/, "even?")
avoids(/%\s*2|\.modulo\b/, "% 2")
