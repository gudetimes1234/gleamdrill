def daily_temperatures(temperatures)
  result = Array.new(temperatures.length, 0)
  stack = [] # [index, temp] pairs, temps monotonically decreasing

  temperatures.each_with_index do |temp, i|
    while !stack.empty? && temp > stack.last[1]
      prev_index, _ = stack.pop
      result[prev_index] = i - prev_index
    end
    stack << [i, temp]
  end
  result
end
