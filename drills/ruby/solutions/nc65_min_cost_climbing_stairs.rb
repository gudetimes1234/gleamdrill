def min_cost_climbing_stairs(cost)
  # Cost to stand on each step, carried forward: getting here means having
  # paid for one of the two steps below, whichever was cheaper. Two variables
  # again, because nothing older than two steps back can matter.
  one_back = 0
  two_back = 0
  cost.each do |price|
    one_back, two_back = price + [one_back, two_back].min, one_back
  end
  [one_back, two_back].min
end
