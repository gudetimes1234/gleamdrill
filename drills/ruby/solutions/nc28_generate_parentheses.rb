def generate_parenthesis(n)
  out = []
  current = []

  # Two counters, one rule each: an opener is legal while any are left, and a
  # closer is legal only while more are outstanding than openers. Everything
  # reached with both at zero is valid by construction.
  build = lambda do |open_left, close_left|
    if open_left.zero? && close_left.zero?
      out << current.join
      next
    end
    if open_left.positive?
      current << "("
      build.call(open_left - 1, close_left)
      current.pop
    end
    if close_left > open_left
      current << ")"
      build.call(open_left, close_left - 1)
      current.pop
    end
  end

  build.call(n, n)
  out
end
