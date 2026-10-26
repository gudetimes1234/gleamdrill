def top_k_frequent(nums, k)
  counts = nums.tally
  buckets = Array.new(nums.length + 1) { [] }
  counts.each { |num, freq| buckets[freq] << num }

  result = []
  buckets.reverse_each do |bucket|
    bucket.each do |num|
      result << num
      return result if result.length == k
    end
  end
  result
end
