module Solution where

import Data.Bits ((.&.))
import Data.Word (Word32)

hammingWeight :: Word32 -> Int
hammingWeight = go 0
  where
    -- n .&. (n - 1) clears the lowest set bit, so this loops once per one
    -- bit.
    go count 0 = count
    go count n = go (count + 1) (n .&. (n - 1))
