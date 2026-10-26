need :late_notices

loans = { "ann" => 3, "bo" => 10, "cy" => 7 }
tc "late_notices(loans, 8)", ["ann owes 10", "cy owes 2"], late_notices(loans, 8)
tc "late_notices(loans, 3) -- due today is not late", [], late_notices(loans, 3)
tc "late_notices({}, 8)", [], late_notices({}, 8)
uses(/\.filter_map\b/, "filter_map")
avoids(/\.each\b/, "each loop")
avoids(/<<|\.push\b/, "pushing into an accumulator")
