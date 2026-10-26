need :digits_of

tc "digits_of(907)", [9, 0, 7], digits_of(907)
tc "digits_of(5)", [5], digits_of(5)
tc "digits_of(0) -- zero is one digit", [0], digits_of(0)
uses(/\.digits\b/, "digits")
avoids(/\.to_s\b|\.chars\b/, "a trip through a string")
