def can_jump(nums)
  return true if nums.empty?

  # Walk backwards carrying the leftmost index known to reach the end. Any
  # index that can reach *that* can reach the end, so it becomes the new goal.
  goal = nums.length - 1
  (nums.length - 1).downto(0) do |i|
    goal = i if i + nums[i] >= goal
  end
  goal.zero?
end
