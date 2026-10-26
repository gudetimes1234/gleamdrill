need :balance_status

tc "balance_status(0)", "settled", balance_status(0)
tc "balance_status(0.0) -- a float zero too", "settled", balance_status(0.0)
tc "balance_status(12)", "in credit", balance_status(12)
tc "balance_status(-3)", "owing", balance_status(-3)
uses(/\.(zero|positive|negative)\?/, "zero? / positive?")
avoids(/[=<>]=?\s*0\b/, "comparing with 0")
