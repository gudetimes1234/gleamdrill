def combination_sum(candidates, target)
  build(candidates, target)
end

# Each step either takes the current candidate again (reuse is allowed) or
# drops it for good. Never going back to a dropped candidate is what stops the
# same combination appearing in several orders, so no deduplication is needed.
def build(candidates, target)
  return [[]] if target.zero?
  return [] if candidates.empty?

  first, *rest = candidates
  return build(rest, target) if first > target || first <= 0

  with_first = build(candidates, target - first).map { |combination| [first] + combination }
  with_first + build(rest, target)
end
