module Solution where

canJump :: [Int] -> Bool
canJump nums = go 0 (zip [0 ..] nums)
  where
    -- Carry the furthest reachable index; falling behind it is the end.
    go _ [] = True
    go furthest ((i, n) : rest)
      | i > furthest = False
      | otherwise = go (max furthest (i + n)) rest
