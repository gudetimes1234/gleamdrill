def to_fahrenheit(celsius)
  result = []
  i = 0
  while i < celsius.length
    result.push((celsius[i] * 9.0 / 5 + 32).round(1))
    i += 1
  end
  result
end
