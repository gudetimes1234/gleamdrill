def subsets(nums)
  # Every element is either in or out, independently, so the subsets of a list
  # are the subsets of its tail twice over: once with the head added and once
  # without. That is the whole recursion, and it is why there are 2^n of them.
  return [[]] if nums.empty?

  head, *tail = nums
  without = subsets(tail)
  without.map { |subset| [head] + subset } + without
end
