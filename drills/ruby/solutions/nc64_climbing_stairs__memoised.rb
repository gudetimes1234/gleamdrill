def climb_stairs(n)
  ways(n, {})
end

# The same recurrence from the top down, with a cache. Slower and heavier
# than the rolling pair, but it is the shape you reach for first when the
# recurrence is not obviously a straight line, and the memo is the whole
# difference between O(n) and O(2^n).
def ways(k, memo)
  return 1 if k <= 1

  memo[k] ||= ways(k - 1, memo) + ways(k - 2, memo)
end
