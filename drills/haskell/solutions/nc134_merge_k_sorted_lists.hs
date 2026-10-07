module Solution where

-- Merge in pairs, halving the number of lists each round. Folding them in
-- one at a time re-walks the growing result every time -- O(k*n) -- while
-- pairing gives O(n log k) for the same merges, because each element is
-- copied once per round and there are log k rounds.
mergeKLists :: [[Int]] -> [Int]
mergeKLists lists = rounds (filter (not . null) lists)
  where
    rounds [] = []
    rounds [only] = only
    rounds remaining = rounds (pairUp remaining)
    pairUp (a : b : rest) = merge a b : pairUp rest
    pairUp leftover = leftover
    merge [] second = second
    merge first [] = first
    merge (a : as) (b : bs)
      | a <= b = a : merge as (b : bs)
      | otherwise = b : merge (a : as) bs
