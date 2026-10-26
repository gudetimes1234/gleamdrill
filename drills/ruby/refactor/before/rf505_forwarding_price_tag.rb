def format_price(amount, currency: "USD", decimals: 2)
  "#{format("%.#{decimals}f", amount)} #{currency}"
end

def price_tag(amount, currency: "USD", decimals: 2)
  "Price: #{format_price(amount, currency: currency, decimals: decimals)}"
end
