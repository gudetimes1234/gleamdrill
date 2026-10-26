need :shipping_cost

tc "shipping_cost(3)", 6.0, shipping_cost(3)
tc "shipping_cost(3, express: true)", 12.0, shipping_cost(3, express: true)
tc "shipping_cost(1, express: true, insured: true)", 9.0, shipping_cost(1, express: true, insured: true)
tc "shipping_cost(0, insured: true) -- weightless", 5.0, shipping_cost(0, insured: true)
typo = begin
  shipping_cost(1, expres: true)
  "accepted"
rescue ArgumentError
  "ArgumentError"
end
tc "style: shipping_cost(1, expres: true) -- a typo is caught", "ArgumentError", typo
uses(/def\s+shipping_cost\([^)]*\w+:/, "keyword arguments")
avoids(/\[:\w+\]/, "reading an options hash")
