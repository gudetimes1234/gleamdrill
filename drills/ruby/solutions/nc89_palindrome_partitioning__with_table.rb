def partition(s)
  n = s.length

  # Work out which spans are palindromes once, up front, rather than
  # re-testing the same prefix on every branch of the search. The search is
  # then pure choice: a table lookup replaces a linear scan at every step.
  table = {}
  (0...n).each do |span|
    (0...(n - span)).each do |i|
      j = i + span
      inside = j - i < 2 || table[[i + 1, j - 1]]
      table[[i, j]] = s[i] == s[j] && inside
    end
  end

  build = lambda do |start|
    return [[]] if start >= n

    (start...n).flat_map do |stop|
      next [] unless table[[start, stop]]

      build.(stop + 1).map { |rest| [s[start..stop]] + rest }
    end
  end

  build.(0)
end
