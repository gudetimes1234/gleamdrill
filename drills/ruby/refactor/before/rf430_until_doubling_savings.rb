def years_to_double(balance, rate)
  years = 0
  target = balance * 2
  while true
    if balance >= target
      return years
    end
    balance = balance * (1 + rate)
    years += 1
  end
end
