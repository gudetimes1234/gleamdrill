def jump(nums)
  return 0 if nums.length <= 1

  # From the goal, step back to the *earliest* index that can reach it: taking
  # the earliest can never cost more jumps, and it is the only choice that is
  # obviously safe. O(n^2), and it makes the greedy argument visible.
  goal = nums.length - 1
  jumps = 0
  while goal > 0
    earliest = (0...nums.length).find { |i| i + nums[i] >= goal }
    break if earliest.nil?

    goal = earliest
    jumps += 1
  end
  jumps
end
