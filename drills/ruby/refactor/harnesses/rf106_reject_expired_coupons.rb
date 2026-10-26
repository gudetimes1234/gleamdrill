need :active_coupons

spring = { code: "SPRING", expires: "2026-04-30" }
fall = { code: "FALL", expires: "2026-11-30" }
today = { code: "TODAY", expires: "2026-10-25" }
tc 'active_coupons([spring, fall], "2026-10-25")', [fall], active_coupons([spring, fall], "2026-10-25")
tc 'active_coupons([today], "2026-10-25") -- expires today, still valid', [today], active_coupons([today], "2026-10-25")
tc 'active_coupons([], "2026-10-25")', [], active_coupons([], "2026-10-25")
uses(/\.reject\b/, "reject")
avoids(/\.each\b/, "each loop")
avoids(/\bnext\b|<<|\.push\b/, "next and push")
