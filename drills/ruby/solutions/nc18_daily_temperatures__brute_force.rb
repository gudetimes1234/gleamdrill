def daily_temperatures(temperatures)
  temperatures.each_with_index.map do |temp, i|
    j = (i + 1...temperatures.length).find { |later| temperatures[later] > temp }
    j ? j - i : 0
  end
end
