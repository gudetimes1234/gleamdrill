need :menu_lines

Dish = Struct.new(:name, :price)
tc "menu_lines([soup 4, pie 6])", ["1) soup $4", "2) pie $6"], menu_lines([Dish.new("soup", 4), Dish.new("pie", 6)])
tc "menu_lines([])", [], menu_lines([])
tc "menu_lines([tea 0])", ["1) tea $0"], menu_lines([Dish.new("tea", 0)])
uses(/with_index/, "map.with_index")
avoids(/\w\[i\]/, "indexing by position")
avoids(/\(0\s*\.\.\.?/, "an index range")
