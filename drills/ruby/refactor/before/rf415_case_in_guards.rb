def shipping_for(order)
  if order[:country] == "NO" && order[:total] >= 500
    0
  elsif order[:country] == "NO"
    49
  elsif order[:total] >= 1000
    0
  else
    149
  end
end
