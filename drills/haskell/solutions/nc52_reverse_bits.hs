module Solution where

import Data.Bits (shiftL, shiftR, (.&.), (.|.))
import Data.Word (Word32)

reverseBits :: Word32 -> Word32
reverseBits num = go num 0 (32 :: Int)
  where
    -- Peel the low bit off one side and push it onto the other, 32 times.
    go _ result 0 = result
    go remaining result i = go (remaining `shiftR` 1) (result `shiftL` 1 .|. remaining .&. 1) (i - 1)
