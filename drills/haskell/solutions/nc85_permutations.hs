module Solution where

-- Pick each remaining element in turn as the next entry.
permute :: [Int] -> [[Int]]
permute [] = [[]]
permute nums = [ n : rest | (n, others) <- picks nums, rest <- permute others ]

picks :: [Int] -> [(Int, [Int])]
picks [] = []
picks (n : rest) = (n, rest) : [ (m, n : others) | (m, others) <- picks rest ]
