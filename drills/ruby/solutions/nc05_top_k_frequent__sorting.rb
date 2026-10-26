def top_k_frequent(nums, k)
  nums.tally.sort_by { |_num, freq| -freq }.first(k).map(&:first)
end
