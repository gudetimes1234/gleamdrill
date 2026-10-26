def climb_stairs(n)
  # The last move was either one step or two, so the ways to reach step n are
  # the ways to reach n-1 plus the ways to reach n-2: Fibonacci with a
  # staircase painted on it. Only the last two values matter.
  previous = 0
  current = 1
  n.times do
    previous, current = current, previous + current
  end
  current
end
