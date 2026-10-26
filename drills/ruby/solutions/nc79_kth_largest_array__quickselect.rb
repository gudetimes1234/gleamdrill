def find_kth_largest(nums, k)
  return nil if k < 1 || k > nums.length

  quickselect(nums, k)
end

# Quickselect: partition around a pivot, then recurse into the side that must
# contain the answer rather than sorting both. Expected O(n), because the work
# halves each time instead of being repeated, the same saving binary search
# makes over a scan.
def quickselect(nums, k)
  pivot, *rest = nums
  bigger = rest.select { |n| n > pivot }
  equal = rest.select { |n| n == pivot }
  smaller = rest.select { |n| n < pivot }

  return quickselect(bigger, k) if k <= bigger.length
  return pivot if k <= bigger.length + 1 + equal.length

  quickselect(smaller, k - bigger.length - 1 - equal.length)
end
