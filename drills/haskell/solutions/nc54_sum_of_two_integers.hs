module Solution where

import Data.Bits (shiftL, xor, (.&.))

-- XOR adds without carrying; AND finds where a carry is due, shifted left
-- one place. Repeat until nothing is left to carry.
getSum :: Int -> Int -> Int
getSum a 0 = a
getSum a b = getSum (a `xor` b) ((a .&. b) `shiftL` 1)
