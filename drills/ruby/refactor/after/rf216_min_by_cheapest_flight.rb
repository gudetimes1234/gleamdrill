def cheapest(flights)
  flights.min_by { |flight| flight[:price] }
end
