module Solution where

import Data.Bits (xor)

-- XOR every index and every value: the pairs cancel, the missing one
-- (which appears only as an index) survives.
missingNumber :: [Int] -> Int
missingNumber nums = foldl xor (length nums) (zipWith xor [0 ..] nums)
