def permute(nums)
  # Pick each element in turn as the first, then permute what is left.
  # Removing the chosen element from the remainder is what the "used" set does
  # in an in-place version; here the remainder is simply a shorter list.
  return [[]] if nums.empty?

  nums.each_with_index.flat_map do |value, i|
    rest = nums[0...i] + nums[(i + 1)..]
    permute(rest).map { |tail| [value] + tail }
  end
end
