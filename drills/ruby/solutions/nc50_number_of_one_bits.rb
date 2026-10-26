def hamming_weight(n)
  # n & (n - 1) clears the lowest set bit and nothing else, so the loop runs
  # once per one bit rather than once per bit position.
  count = 0
  until n.zero?
    n &= n - 1
    count += 1
  end
  count
end
