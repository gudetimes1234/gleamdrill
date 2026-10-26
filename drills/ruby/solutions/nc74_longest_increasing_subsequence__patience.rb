def length_of_lis(nums)
  # Patience sorting. Keep the smallest value that any subsequence of each
  # length ends with; that list is always sorted, so each number either
  # extends it or replaces the first entry it is no bigger than. The list is
  # not the answer subsequence: only its length is meaningful.
  tails = []
  nums.each do |n|
    at = tails.bsearch_index { |tail| tail >= n } || tails.length
    tails[at] = n
  end
  tails.length
end
