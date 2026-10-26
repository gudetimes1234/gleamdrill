need :total_letters

tc "total_letters(%w[ruby rocks])", 9, total_letters(%w[ruby rocks])
tc 'total_letters(["", "a"]) -- empty words add nothing', 1, total_letters(["", "a"])
tc "total_letters([])", 0, total_letters([])
uses(/\.sum\b/, "sum")
avoids(/\.(inject|reduce)\b/, "inject")
avoids(/\.(map|collect)\b/, "map then add")
