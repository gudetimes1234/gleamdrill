need :sales_table

sales = [["north", "tea", 3], ["north", "tea", 2], ["south", "cake", 1], ["north", "cake", 4]]
tc "sales_table(sales)", { "north" => { "tea" => 5, "cake" => 4 }, "south" => { "cake" => 1 } }, sales_table(sales)
tc "sales_table([])", {}, sales_table([])
tc 'sales_table([["east", "pie", 0]]) -- zero still counts', { "east" => { "pie" => 0 } }, sales_table([["east", "pie", 0]])
uses(/Hash\.new\s*(\{|do\b)/, "Hash.new with a block")
avoids(/key\?|\bunless\b|\bif\b/, "creating each level by hand")
