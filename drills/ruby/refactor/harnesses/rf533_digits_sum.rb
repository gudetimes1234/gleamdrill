need :digit_sum

tc "digit_sum(1234)", 10, digit_sum(1234)
tc "digit_sum(1000)", 1, digit_sum(1000)
tc "digit_sum(7)", 7, digit_sum(7)
tc "digit_sum(0) -- zero", 0, digit_sum(0)
uses(/\.digits\b/, "digits")
avoids(/\bwhile\b|%\s*10/, "peeling digits off with % 10")
