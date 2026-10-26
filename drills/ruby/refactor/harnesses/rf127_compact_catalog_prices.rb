need :prices_for

catalog = { "A1" => 300, "B2" => 150 }
tc 'prices_for(["A1", "ZZ", "B2"], catalog) -- ZZ is unknown', [300, 150], prices_for(["A1", "ZZ", "B2"], catalog)
tc 'prices_for(["ZZ"], catalog)', [], prices_for(["ZZ"], catalog)
tc "prices_for([], catalog)", [], prices_for([], catalog)
uses(/\.compact\b/, "compact")
avoids(/\.each\b|\bwhile\b/, "index loop")
avoids(/\bnil\b/, "a nil check")
