require "set"

def can_partition(nums)
  total = nums.sum
  return false if total.odd?

  # Subset sum in disguise: an equal split exists exactly when some subset
  # adds up to half the total. Carry the set of sums reachable so far and
  # widen it by each number: no ordering, no table, and duplicates cost
  # nothing because a set collapses them.
  half = total / 2
  reachable = Set[0]
  nums.each do |n|
    reachable |= reachable.map { |reached| reached + n }.select { |sum| sum <= half }
  end

  reachable.include?(half)
end
