need :unit_price

tc 'unit_price({ "A1" => 5 }, "A1")', 5, unit_price({ "A1" => 5 }, "A1")
tc 'unit_price({ "A1" => 5 }, "Z9") -- missing, so 0', 0, unit_price({ "A1" => 5 }, "Z9")
tc 'unit_price({ "B2" => nil }, "B2") -- present, so nil', nil, unit_price({ "B2" => nil }, "B2")
tc 'unit_price({}, "A1")', 0, unit_price({}, "A1")
uses(/\.fetch\b/, "fetch")
avoids(/\bif\b|key\?|include\?|member\?/, "checking the key first")
