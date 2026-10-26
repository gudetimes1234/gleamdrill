need :apply_coupon

tc 'apply_coupon(50, "SAVE10")', 40, apply_coupon(50, "SAVE10")
tc 'apply_coupon(50, "OTHER")', 50, apply_coupon(50, "OTHER")
tc 'apply_coupon(0, nil) -- no coupon at all', 0, apply_coupon(0, nil)
uses(/[^=\s(][ \t]+if\b/, "a modifier if")
avoids(/^[ \t]*if\b/, "if ... end block")
