def is_match(s, p)
  memo = {}

  # A star binds to the character *before* it, so the pattern has to be read
  # two symbols at a time. Given "x*", either skip the pair entirely (zero
  # copies) or, if x matches here, consume one character of the text and
  # stay on the same pair. Everything else is a single-character match.
  works = lambda do |i, j|
    return i >= s.length if j >= p.length

    key = [i, j]
    unless memo.key?(key)
      here = i < s.length && [s[i], "."].include?(p[j])
      memo[key] =
        if j + 1 < p.length && p[j + 1] == "*"
          works.(i, j + 2) || (here && works.(i + 1, j))
        else
          here && works.(i + 1, j + 1)
        end
    end
    memo[key]
  end

  works.(0, 0)
end
