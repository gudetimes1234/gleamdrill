need :points

tc "points([1, 2, 3], [4, 5, 6])", ["(1, 4)", "(2, 5)", "(3, 6)"], points([1, 2, 3], [4, 5, 6])
tc "points([], [])", [], points([], [])
tc "points([0], [-1])", ["(0, -1)"], points([0], [-1])
uses(/\.zip\b/, "zip")
avoids(/\bwhile\b/, "while loop")
avoids(/<</, "pushing into a result")
