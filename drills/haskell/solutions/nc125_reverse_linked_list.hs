module Solution where

-- Walk the list, consing each value onto the reversed front so far --
-- the accumulator plays the `previous` pointer of the iterative version.
reverseList :: [Int] -> [Int]
reverseList = go []
  where
    go previous [] = previous
    go previous (v : rest) = go (v : previous) rest
