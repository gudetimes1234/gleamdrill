def format_price(amount, currency: "USD", decimals: 2)
  "#{format("%.#{decimals}f", amount)} #{currency}"
end

def price_tag(...)
  "Price: #{format_price(...)}"
end
