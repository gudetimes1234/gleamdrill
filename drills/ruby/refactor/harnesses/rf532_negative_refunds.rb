need :refund_count

tc "refund_count([20, -5, 13, -2.5])", 2, refund_count([20, -5, 13, -2.5])
tc "refund_count([0, 4]) -- zero is not a refund", 0, refund_count([0, 4])
tc "refund_count([]) -- empty", 0, refund_count([])
uses(/negative\?/, "negative?")
avoids(/<\s*0\b/, "< 0")
avoids(/\+=/, "a hand-kept counter")
