def search(nums, target)
  left = 0
  right = nums.length - 1

  while left <= right
    mid = left + (right - left) / 2
    return mid if nums[mid] == target

    if nums[left] <= nums[mid] # left half sorted
      if nums[left] <= target && target < nums[mid]
        right = mid - 1
      else
        left = mid + 1
      end
    elsif nums[mid] < target && target <= nums[right] # right half sorted
      left = mid + 1
    else
      right = mid - 1
    end
  end
  -1
end
