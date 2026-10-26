need :price_tag, :format_price

tc "price_tag(3.5)", "Price: 3.50 USD", price_tag(3.5)
tc 'price_tag(10, currency: "EUR")', "Price: 10.00 EUR", price_tag(10, currency: "EUR")
tc "price_tag(7, decimals: 0)", "Price: 7 USD", price_tag(7, decimals: 0)
tc "price_tag(0) -- free", "Price: 0.00 USD", price_tag(0)
uses(/\.\.\.|\*\*/, "argument forwarding")
avoids(/currency:\s*currency|decimals:\s*decimals/, "repeating each keyword")
