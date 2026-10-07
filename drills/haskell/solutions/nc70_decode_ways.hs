module Solution where

import Data.Char (digitToInt)

-- Ways to decode the prefix ending here: the last digit alone (if not
-- zero) plus the last two digits together (if 10..26).
numDecodings :: String -> Int
numDecodings [] = 0
numDecodings s@(first : _)
  | first == '0' = 0
  | otherwise = go 1 1 (zip s (drop 1 s))
  where
    go _ oneBack [] = oneBack
    go twoBack oneBack ((previous, current) : rest) = go oneBack (singles + doubles) rest
      where
        singles = if current /= '0' then oneBack else 0
        pair = digitToInt previous * 10 + digitToInt current
        doubles = if pair >= 10 && pair <= 26 then twoBack else 0
