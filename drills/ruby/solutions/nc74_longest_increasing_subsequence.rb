def length_of_lis(nums)
  # The longest subsequence ending at each position: one plus the best of
  # every earlier position holding a smaller value. Building the answers in
  # order means every "earlier position" is already known.
  endings = []
  best = 0

  nums.each do |n|
    here = 1 + (endings.filter_map { |value, length| length if value < n }.max || 0)
    endings << [n, here]
    best = [best, here].max
  end

  best
end
