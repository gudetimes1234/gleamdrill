need :PriceList

calls = 0
list = PriceList.new(-> { calls += 1; { apple: 3, pear: 4 } })
tc "list.prices", { apple: 3, pear: 4 }, list.prices
tc "list.prices again", { apple: 3, pear: 4 }, list.prices
tc "loader calls after two reads -- loaded once", 1, calls
uses(/@\w+\s*\|\|=/, "@ivar ||=")
avoids(/\.nil\?|==\s*nil|\bif\b/, "nil check")
