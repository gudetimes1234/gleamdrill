def rob(nums)
  best(nums, 0, {})
end

# The same choice written as a recursion from the front: rob this house and
# skip the next, or skip this one. Exponential without the cache and linear
# with it, which is the lesson, since the rolling pair hides that the problem
# ever had a tree of choices at all.
def best(nums, index, memo)
  return 0 if index >= nums.length

  memo[index] ||= [nums[index] + best(nums, index + 2, memo), best(nums, index + 1, memo)].max
end
