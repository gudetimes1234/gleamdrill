def years_to_double(balance, rate)
  years = 0
  target = balance * 2
  until balance >= target
    balance *= 1 + rate
    years += 1
  end
  years
end
