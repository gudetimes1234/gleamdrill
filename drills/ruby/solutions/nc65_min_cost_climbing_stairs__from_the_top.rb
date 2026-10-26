def min_cost_climbing_stairs(cost)
  # The same recurrence read the other way: instead of "what did it cost to
  # get here", ask "what will it cost to finish from here". Walking backwards,
  # the answer at each step is its own price plus the cheaper of the two
  # ahead, and the start is the better of the first two.
  one_ahead = 0
  two_ahead = 0
  cost.reverse_each do |price|
    one_ahead, two_ahead = price + [one_ahead, two_ahead].min, one_ahead
  end
  [one_ahead, two_ahead].min
end
