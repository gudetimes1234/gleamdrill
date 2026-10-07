module Solution where

import Prelude hiding (reverse)

reverse :: Int -> Int
reverse x0 = go x0 0
  where
    -- quotRem truncates toward zero, as Go's % and / do, so the sign
    -- rides along in the digits. The answer must fit a signed 32-bit
    -- int, whatever Int is here.
    go 0 result = result
    go x result
      | grown > 2147483647 || grown < -2147483648 = 0
      | otherwise = go rest grown
      where
        (rest, digit) = x `quotRem` 10
        grown = result * 10 + digit
