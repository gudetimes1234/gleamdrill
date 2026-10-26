def is_interleave(s1, s2, s3)
  return false if s1.length + s2.length != s3.length

  memo = {}

  # How much of each source has been used is the entire state: the position
  # in the target is their sum, so it never has to be tracked. That collapse
  # from three indices to two is what makes the table two-dimensional.
  works = lambda do |i, j|
    return true if i == s1.length && j == s2.length

    key = [i, j]
    unless memo.key?(key)
      target = s3[i + j]
      memo[key] = (i < s1.length && s1[i] == target && works.(i + 1, j)) ||
                  (j < s2.length && s2[j] == target && works.(i, j + 1))
    end
    memo[key]
  end

  works.(0, 0)
end
