def find_min(nums)
  left = 0
  right = nums.length - 1

  while left < right
    mid = left + (right - left) / 2
    # A middle bigger than the right end means the drop is to its right.
    if nums[mid] > nums[right]
      left = mid + 1
    else
      right = mid
    end
  end
  nums[left]
end
