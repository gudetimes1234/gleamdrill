module Solution where

checkValidString :: String -> Bool
checkValidString = go 0 0
  where
    -- Track the range of possible open counts: a star can widen it either
    -- way. The low end never goes below zero (a star read as ')' when
    -- nothing is open is better read as nothing).
    go low _ [] = low == (0 :: Int)
    go low high (c : rest)
      | high' < 0 = False
      | otherwise = go (max low' 0) high' rest
      where
        (low', high') = case c of
          '(' -> (low + 1, high + 1)
          ')' -> (low - 1, high - 1)
          _ -> (low - 1, high + 1)
