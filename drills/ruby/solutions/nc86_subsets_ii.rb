def subsets_with_dup(nums)
  build(nums.sort)
end

# Sorting puts equal values next to each other, which is what makes the
# duplicate rule expressible: when the head is skipped, skip *every* copy of it
# at once. Skipping one copy and keeping the next would rebuild the same subset
# by a different route.
def build(sorted_nums)
  return [[]] if sorted_nums.empty?

  first = sorted_nums[0]
  with_first = build(sorted_nums.drop(1)).map { |subset| [first] + subset }

  past = 1
  past += 1 while past < sorted_nums.length && sorted_nums[past] == first

  with_first + build(sorted_nums.drop(past))
end
