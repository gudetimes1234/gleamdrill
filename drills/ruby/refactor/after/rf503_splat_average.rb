def average(*numbers)
  return nil if numbers.empty?
  numbers.sum.fdiv(numbers.size)
end
