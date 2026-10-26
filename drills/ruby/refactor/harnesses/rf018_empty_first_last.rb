need :span

tc "span([3, 9, 4])", "3 to 4", span([3, 9, 4])
tc "span([]) -- nothing", "none", span([])
tc "span([7]) -- one element is both ends", "7 to 7", span([7])
uses(/\.empty\?/, "empty?")
uses(/\.first\b/, "first")
uses(/\.last\b/, "last")
avoids(/\.(length|size|count)\s*==\s*0/, "length == 0")
avoids(/\[0\]|\[-1\]/, "[0] / [-1]")
