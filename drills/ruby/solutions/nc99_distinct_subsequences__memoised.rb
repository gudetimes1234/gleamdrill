def num_distinct(s, t)
  memo = {}

  # The choice written out: when the characters match, either use this source
  # character for this target character or skip it; when they do not, skipping
  # is the only option. Running out of target is one complete subsequence,
  # which is why the base case is 1 rather than 0.
  ways = lambda do |i, j|
    return 1 if j >= t.length
    return 0 if i >= s.length

    memo[[i, j]] ||= begin
      total = ways.(i + 1, j)
      total += ways.(i + 1, j + 1) if s[i] == t[j]
      total
    end
  end

  ways.(0, 0)
end
