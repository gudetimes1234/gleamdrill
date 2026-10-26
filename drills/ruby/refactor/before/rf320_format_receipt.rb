def receipt_line(item, price)
  cents = (price * 100).round
  whole = (cents / 100).to_s
  part = (cents % 100).to_s
  part = "0" + part if part.length < 2
  amount = whole + "." + part
  item + " " * (12 - item.length) + " " * (8 - amount.length) + amount
end
