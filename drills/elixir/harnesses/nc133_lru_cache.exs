# The LeetCode example, threaded through: capacity 2, then put(1,1), put(2,2),
# get(1), put(3,3) -- which must evict key 2, not key 1.
cache = Solution.new(2) |> Solution.put(1, 1) |> Solution.put(2, 2)
{first, cache} = Solution.get(cache, 1)
cache = Solution.put(cache, 3, 3)
{evicted, cache} = Solution.get(cache, 2)
{kept, cache} = Solution.get(cache, 3)
cache = Solution.put(cache, 4, 4)
{gone, cache} = Solution.get(cache, 1)
{still_there, cache} = Solution.get(cache, 3)
{newest, cache} = Solution.get(cache, 4)
{missing, _cache} = Solution.get(cache, 99)

updated = Solution.new(1) |> Solution.put(5, 5) |> Solution.put(5, 9)
{overwritten, _} = Solution.get(updated, 5)

[
  {"get(1) after put(1,1), put(2,2)", inspect(1), inspect(first)},
  {"get(2) after put(3,3) -- 2 was least recently used", inspect(-1), inspect(evicted)},
  {"get(3) after put(3,3)", inspect(3), inspect(kept)},
  {"get(1) after put(4,4) -- reading 3 saved it, so 1 went", inspect(-1), inspect(gone)},
  {"get(3) after put(4,4)", inspect(3), inspect(still_there)},
  {"get(4) after put(4,4)", inspect(4), inspect(newest)},
  {"get(99) on a key never stored", inspect(-1), inspect(missing)},
  {"get(5) after put(5,5) then put(5,9) -- an update, not an insert", inspect(9),
   inspect(overwritten)}
]
