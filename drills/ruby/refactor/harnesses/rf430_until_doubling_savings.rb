need :years_to_double

tc "years_to_double(100, 0.07)", 11, years_to_double(100, 0.07)
tc "years_to_double(100, 1.0) -- doubles in a year", 1, years_to_double(100, 1.0)
tc "years_to_double(0, 0.05) -- nothing doubles at once", 0, years_to_double(0, 0.05)
uses(/\buntil\b|\bloop\b/, "until")
avoids(/\bwhile\s+true\b/, "while true")
avoids(/\breturn\b/, "return from the loop")
