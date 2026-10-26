def cheapest(flights)
  return nil if flights.empty?
  best = 0
  i = 1
  while i < flights.length
    best = i if flights[i][:price] < flights[best][:price]
    i += 1
  end
  flights[best]
end
