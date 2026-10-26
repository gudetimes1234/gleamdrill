def two_sum(numbers, target)
  numbers.each_with_index do |num, i|
    j = (i + 1...numbers.length).bsearch { |k| numbers[k] >= target - num }
    return [i + 1, j + 1] if j && numbers[j] == target - num
  end
  []
end
