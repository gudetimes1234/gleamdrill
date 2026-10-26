def search(nums, target)
  pivot = rotation_point(nums)
  found = binary_search(nums, target, 0, pivot - 1)
  return found if found != -1

  binary_search(nums, target, pivot, nums.length - 1)
end

def rotation_point(nums)
  (1...nums.length).each do |i|
    return i if nums[i] < nums[i - 1]
  end
  0
end

def binary_search(nums, target, lo, hi)
  while lo <= hi
    mid = lo + (hi - lo) / 2
    return mid if nums[mid] == target

    if nums[mid] < target
      lo = mid + 1
    else
      hi = mid - 1
    end
  end
  -1
end
