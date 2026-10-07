module Solution where

import Data.Bits (xor)

-- x `xor` x == 0 and x `xor` 0 == x, so every pair cancels and the loner
-- remains.
singleNumber :: [Int] -> Int
singleNumber = foldl xor 0
