need :daily_changes

tc "daily_changes([10, 12, 9, 9])", [2, -3, 0], daily_changes([10, 12, 9, 9])
tc "daily_changes([]) -- no pairs", [], daily_changes([])
tc "daily_changes([5]) -- one day, no change", [], daily_changes([5])
uses(/\.each_cons\b/, "each_cons")
avoids(/\[i\b|\bi\s*-\s*1/, "indexing neighbours")
avoids(/\.\.\.?\s*\w+\.(length|size)/, "an index range")
