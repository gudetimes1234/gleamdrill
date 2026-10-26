def max_coins(nums)
  # Padding with a 1 at each end removes the edge cases: every balloon then
  # has a neighbour on both sides whatever happens.
  balloons = [1] + nums + [1]
  memo = {}

  # The trick is to ask which balloon is burst *last* in a span rather than
  # first. The last one still has both span boundaries as neighbours (they
  # are untouched by definition) so its value is known, and the two sides
  # become independent subproblems. Asking "first" leaves neighbours that
  # depend on the other side, and the recursion does not close.
  best = lambda do |left, right|
    return 0 if right - left < 2

    memo[[left, right]] ||= (left + 1...right).map { |last|
      balloons[left] * balloons[last] * balloons[right] + best.(left, last) + best.(last, right)
    }.max
  end

  best.(0, balloons.length - 1)
end
