def combination_sum2(candidates, target)
  # Generate every subset that hits the target and collapse the repeats
  # afterwards. Correct, and exponentially wasteful on inputs with many equal
  # values, which is exactly why the skipping rule is worth getting right.
  found = []
  every_subset(candidates.sort).each do |subset|
    found << subset if subset.sum == target && !found.include?(subset)
  end
  found
end

def every_subset(sorted_candidates)
  return [[]] if sorted_candidates.empty?

  first, *rest = sorted_candidates
  without = every_subset(rest)
  without.map { |subset| [first] + subset } + without
end
