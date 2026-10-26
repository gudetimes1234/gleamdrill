def balance_status(balance)
  if balance.zero?
    "settled"
  elsif balance.positive?
    "in credit"
  else
    "owing"
  end
end
