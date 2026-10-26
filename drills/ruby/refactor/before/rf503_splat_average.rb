def average(a = nil, b = nil, c = nil, d = nil)
  numbers = [a, b, c, d].compact
  return nil if numbers.empty?
  numbers.sum.fdiv(numbers.size)
end
