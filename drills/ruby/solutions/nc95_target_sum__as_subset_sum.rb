def find_target_sum_ways(nums, target)
  # Rewrite the problem. If P is the set given a plus and N the set given a
  # minus, then P - N = target and P + N = total, so P = (total + target) / 2.
  # That turns a sign-assignment question into "how many subsets sum to a
  # fixed value": a knapsack, with no negative totals to track at all.
  total = nums.sum
  wanted = total + target
  return 0 if wanted.negative? || wanted.odd? || total < target.abs

  goal = wanted / 2
  counts = { 0 => 1 }
  nums.each do |n|
    following = Hash.new(0).merge(counts)
    counts.each do |reached, ways|
      following[reached + n] += ways if reached + n <= goal
    end
    counts = following
  end

  counts.fetch(goal, 0)
end
