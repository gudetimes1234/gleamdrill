def max_coins(nums)
  balloons = [1] + nums + [1]
  n = balloons.length
  table = Array.new(n) { Array.new(n, 0) }

  # The same "which balloon goes last" recurrence filled by hand, shortest
  # spans first, because a span's answer needs both of the shorter spans
  # that a chosen last balloon splits it into. Writing the loop order out
  # makes that dependency visible where the recursion leaves it implicit.
  (2...n).each do |width|
    (0...n - width).each do |left|
      right = left + width
      table[left][right] = (left + 1...right).map { |last|
        balloons[left] * balloons[last] * balloons[right] + table[left][last] + table[last][right]
      }.max
    end
  end

  table[0][n - 1]
end
