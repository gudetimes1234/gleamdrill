need :average

tc "average(4)", 4.0, average(4)
tc "average(1, 2)", 1.5, average(1, 2)
tc "average(2, 4, 6, 8)", 5.0, average(2, 4, 6, 8)
tc "average() -- nothing to average", nil, average
tc "style: average(1, 2, 3, 4, 5) -- no cap on the count", 3.0, (average(1, 2, 3, 4, 5) rescue :too_many)
uses(/def\s+average\(\s*\*\w+/, "a splat parameter")
avoids(/=\s*nil/, "nil defaults")
