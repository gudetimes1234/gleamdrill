def rob(nums)
  return 0 if nums.empty?
  return nums[0] if nums.length == 1

  # One pass carrying both stories at the same time: the run that is allowed
  # to take the first house, and the run that is not. Neither ever looks at
  # the other, so this is the two-pass version interleaved, useful when the
  # input can only be walked once.
  with_first = [0, 0]
  without_first = [0, 0]

  nums.each_with_index do |value, i|
    with_first = step(with_first, value) if i != nums.length - 1
    without_first = step(without_first, value) if i != 0
  end

  [with_first[0], without_first[0]].max
end

def step(state, value)
  best, previous = state
  [[best, previous + value].max, best]
end
