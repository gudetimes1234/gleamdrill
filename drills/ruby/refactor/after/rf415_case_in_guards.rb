def shipping_for(order)
  case order
  in { country: "NO", total: } if total >= 500 then 0
  in { country: "NO" } then 49
  in { total: } if total >= 1000 then 0
  else 149
  end
end
