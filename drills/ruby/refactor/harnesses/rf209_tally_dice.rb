need :rolls_seen

tc "rolls_seen([6, 2, 6, 6, 1])", { 6 => 3, 2 => 1, 1 => 1 }, rolls_seen([6, 2, 6, 6, 1])
tc "rolls_seen([])", {}, rolls_seen([])
tc "rolls_seen([4])", { 4 => 1 }, rolls_seen([4])
uses(/\.tally\b/, "tally")
avoids(/\.group_by\b/, "group_by then size")
avoids(/\.(size|length|count)\b/, "counting groups by hand")
