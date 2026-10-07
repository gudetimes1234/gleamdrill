module Solution where

import Data.List (insertBy, sortBy)

-- A descending list as the max-heap: smash the two heaviest; the
-- difference, if any, goes back in.
lastStoneWeight :: [Int] -> Int
lastStoneWeight stones = smash (sortBy (flip compare) stones)
  where
    smash (first : second : rest)
      | first == second = smash rest
      | otherwise = smash (insertBy (flip compare) (first - second) rest)
    smash [single] = single
    smash [] = 0
