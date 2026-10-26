need :combine_stock

warehouse = { "bolts" => 40, "nuts" => 10 }
store = { "nuts" => 5, "washers" => 7 }
tc "combine_stock(warehouse, store)", { "bolts" => 40, "nuts" => 15, "washers" => 7 }, combine_stock(warehouse, store)
tc "combine_stock(warehouse, {})", { "bolts" => 40, "nuts" => 10 }, combine_stock(warehouse, {})
tc "combine_stock(...) leaves warehouse alone", { "bolts" => 40, "nuts" => 10 }, (combine_stock(warehouse, store); warehouse)
uses(/\.merge\s*\([^)]*\)\s*(\{|do\b)/, "merge with a block")
avoids(/\.each\b/, "each loop")
avoids(/key\?|\bif\b/, "checking for clashes")
