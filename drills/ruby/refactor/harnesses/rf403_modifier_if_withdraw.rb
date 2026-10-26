need :withdraw

def error_of
  yield
  "no error"
rescue ArgumentError => e
  e.message
end

tc "withdraw(100, 30)", 70, withdraw(100, 30)
tc "withdraw(100, 100) -- all of it is fine", 0, withdraw(100, 100)
tc "withdraw(10, 20) -- raises", "insufficient funds", error_of { withdraw(10, 20) }
uses(/[^=\s(][ \t]+if\b/, "a modifier if")
avoids(/^[ \t]*if\b/, "if ... end block")
