def subsets_with_dup(nums)
  # A different framing: the answer is not a choice per *element* but a choice
  # per distinct *value*: how many copies of it to take, from none up to
  # however many there are. Duplicates then cannot arise at all, so there is
  # no skipping rule to remember.
  subsets = [[]]
  nums.tally.sort.each do |value, count|
    subsets = subsets.flat_map do |subset|
      (0..count).map { |taken| subset + [value] * taken }
    end
  end
  subsets
end
