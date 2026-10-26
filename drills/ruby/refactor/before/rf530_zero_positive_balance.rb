def balance_status(balance)
  if balance == 0
    "settled"
  elsif balance > 0
    "in credit"
  else
    "owing"
  end
end
