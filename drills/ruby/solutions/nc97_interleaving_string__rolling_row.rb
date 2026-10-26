def is_interleave(s1, s2, s3)
  return false if s1.length + s2.length != s3.length

  # Bottom-up over the same two-index state. Row i says which prefixes of s2
  # can pair with the first i characters of s1; each row depends only on the
  # one above and on itself to the left, so one row suffices.
  row = [true] + [false] * s2.length
  (1..s2.length).each do |j|
    row[j] = row[j - 1] && s2[j - 1] == s3[j - 1]
  end

  (1..s1.length).each do |i|
    row[0] = row[0] && s1[i - 1] == s3[i - 1]
    (1..s2.length).each do |j|
      target = s3[i + j - 1]
      row[j] = (row[j] && s1[i - 1] == target) || (row[j - 1] && s2[j - 1] == target)
    end
  end

  row[s2.length]
end
