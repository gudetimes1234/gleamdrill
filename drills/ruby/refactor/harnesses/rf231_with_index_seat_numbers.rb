need :seat_map

tc 'seat_map(%w[Ann Bo Cy])', { "Ann" => 1, "Bo" => 2, "Cy" => 3 }, seat_map(%w[Ann Bo Cy])
tc "seat_map([])", {}, seat_map([])
tc 'seat_map(["Di"]) -- seats start at 1', { "Di" => 1 }, seat_map(["Di"])
uses(/with_index/, "each_with_index or with_index")
avoids(/\+=/, "a counter variable")
avoids(/\.each\s*(\{|do)/, "each with a block")
