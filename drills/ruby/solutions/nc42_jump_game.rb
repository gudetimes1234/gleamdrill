def can_jump(nums)
  # Only one number matters: the furthest index reachable so far. Walk forward
  # and extend it; the moment the walk gets past it, nothing further is
  # reachable.
  reach = 0
  nums.each_with_index do |jump, i|
    return false if i > reach

    reach = [reach, i + jump].max
  end
  reach >= nums.length - 1
end
