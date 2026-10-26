def longest_common_subsequence(text1, text2)
  memo = {}

  # The same recurrence from the front, with a cache. Written this way the
  # choice is explicit (match and advance both, or give up one character
  # from one side) which the rolling row hides behind its indices.
  best = lambda do |i, j|
    return 0 if i >= text1.length || j >= text2.length

    memo[[i, j]] ||=
      if text1[i] == text2[j]
        best.(i + 1, j + 1) + 1
      else
        [best.(i + 1, j), best.(i, j + 1)].max
      end
  end

  best.(0, 0)
end
