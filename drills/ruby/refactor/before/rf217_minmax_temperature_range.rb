def temperature_range(temps)
  low = temps[0]
  high = temps[0]
  temps.each do |temp|
    low = temp if temp < low
    high = temp if temp > high
  end
  [low, high]
end
