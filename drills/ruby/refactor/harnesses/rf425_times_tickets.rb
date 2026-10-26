need :make_tickets

tc "make_tickets(3)", ["T-1", "T-2", "T-3"], make_tickets(3)
tc "make_tickets(1)", ["T-1"], make_tickets(1)
tc "make_tickets(0) -- none", [], make_tickets(0)
uses(/\.times\b|\.upto\b|\.step\b|\.\.\.?/, "times, upto or a range")
avoids(/\bwhile\b|\buntil\b/, "while loop")
avoids(/\+=\s*1\b/, "manual counter")
