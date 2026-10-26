def can_partition(nums)
  total = nums.sum
  return false if total.odd?

  memo = {}

  # Take this number or leave it, keyed by how much is still owed and how much
  # of the list is left. Written as a recursion it is obviously a search over
  # subsets; the cache is what stops it enumerating all 2^n of them.
  reachable = lambda do |index, owed|
    return true if owed.zero?
    return false if index >= nums.length || owed.negative?

    key = [index, owed]
    memo[key] = reachable.(index + 1, owed - nums[index]) || reachable.(index + 1, owed) unless memo.key?(key)
    memo[key]
  end

  reachable.(0, total / 2)
end
