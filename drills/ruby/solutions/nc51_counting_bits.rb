def count_bits(n)
  # Every number is some smaller number with one extra bit on the end:
  # count(i) is count(i >> 1) plus whatever that last bit is. Each answer
  # costs one lookup, so the whole array is O(n).
  counts = Array.new(n + 1, 0)
  (1..n).each do |i|
    counts[i] = counts[i >> 1] + (i & 1)
  end
  counts
end
