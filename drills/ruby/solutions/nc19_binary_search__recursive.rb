def search(nums, target)
  halve(nums, target, 0, nums.length - 1)
end

def halve(nums, target, lo, hi)
  return -1 if lo > hi

  mid = lo + (hi - lo) / 2
  return mid if nums[mid] == target
  return halve(nums, target, mid + 1, hi) if nums[mid] < target

  halve(nums, target, lo, mid - 1)
end
