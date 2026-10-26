need :price_list

Product = Struct.new(:name, :cents)
tc 'price_list([tea 250, cake 1999])', { "tea" => 2.5, "cake" => 19.99 }, price_list([Product.new("tea", 250), Product.new("cake", 1999)])
tc "price_list([])", {}, price_list([])
tc 'price_list([free 0])', { "free" => 0.0 }, price_list([Product.new("free", 0)])
uses(/\.to_h\s*(\{|do)/, "to_h with a block")
avoids(/\.each\b/, "each loop")
avoids(/\.map\b/, "map then to_h")
