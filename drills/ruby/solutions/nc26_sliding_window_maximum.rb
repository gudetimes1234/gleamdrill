def max_sliding_window(nums, k)
  return [] if k <= 0 || nums.length < k

  n = nums.length
  left = Array.new(n, 0)
  right = Array.new(n, 0)

  # Cut nums into blocks of k: left holds each block's running maximum from
  # its start, right each block's running maximum from its end.
  (0...n).each do |i|
    left[i] = (i % k).zero? ? nums[i] : [left[i - 1], nums[i]].max
  end
  (n - 1).downto(0) do |i|
    right[i] = i == n - 1 || ((i + 1) % k).zero? ? nums[i] : [right[i + 1], nums[i]].max
  end

  # Every window of width k straddles at most one block boundary, so it is
  # covered by a suffix of one block and a prefix of the next.
  (0..n - k).map { |i| [right[i], left[i + k - 1]].max }
end
