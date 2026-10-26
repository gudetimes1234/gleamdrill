def count_bits(n)
  (0..n).map { |i| popcount(i) }
end

# Each number counted from scratch with the clear-lowest-bit trick. O(n log n)
# against the dynamic version's O(n), and it remembers nothing between numbers,
# which is exactly what the other one exploits.
def popcount(n)
  count = 0
  while n != 0
    n &= n - 1
    count += 1
  end
  count
end
