need :low_stock

shelf = { "milk" => 2, "eggs" => 12, "bread" => 0 }
tc "low_stock(shelf, 5)", { "milk" => 2, "bread" => 0 }, low_stock(shelf, 5)
tc "low_stock(shelf, 0) -- nothing below zero", {}, low_stock(shelf, 0)
tc "low_stock({}, 5)", {}, low_stock({}, 5)
uses(/\.(select|filter)\b/, "select")
avoids(/\.each\b/, "each loop")
avoids(/\bif\b/, "if")
