module Solution where

-- A negative flips the largest and smallest products ending here, so
-- carry both: the smallest may become the largest at the next negative.
maxProduct :: [Int] -> Int
maxProduct [] = 0
maxProduct nums@(first : _) = go first 1 1 nums
  where
    go best _ _ [] = best
    go best largest smallest (n : rest) = go (max best largest') largest' smallest' rest
      where
        candidates = [n, largest * n, smallest * n]
        largest' = maximum candidates
        smallest' = minimum candidates
