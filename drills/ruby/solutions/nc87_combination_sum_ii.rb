def combination_sum2(candidates, target)
  build(candidates.sort, target)
end

# Each candidate is used at most once, so taking one moves past it. The
# duplicate rule is the same as in Subsets II: skipping a value means skipping
# every copy of it, otherwise the same combination is rebuilt from a different
# copy of the same number.
def build(sorted_candidates, target)
  return [[]] if target.zero?
  return [] if sorted_candidates.empty?

  first = sorted_candidates[0]
  return [] if first > target

  with_first = build(sorted_candidates.drop(1), target - first).map { |rest| [first] + rest }

  past = 1
  past += 1 while past < sorted_candidates.length && sorted_candidates[past] == first

  with_first + build(sorted_candidates.drop(past), target)
end
