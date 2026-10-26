def last_stone_weight(stones)
  # No ordering kept at all: scan for the heaviest, remove it, scan again.
  # O(n) per round against a heap's O(log n), which is worse, but it makes
  # clear that the only operation the problem needs is "give me the largest",
  # exactly the interface a heap provides.
  stones = stones.dup

  while stones.length > 1
    heaviest = stones.delete_at(stones.index(stones.max))
    following = stones.delete_at(stones.index(stones.max))
    stones << heaviest - following if heaviest != following
  end

  stones.first || 0
end
