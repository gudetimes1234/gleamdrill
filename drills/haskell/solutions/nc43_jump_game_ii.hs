module Solution where

jump :: [Int] -> Int
jump nums = go (zip [0 ..] (take (length nums - 1) nums)) 0 0 0
  where
    -- Treat the indices reachable in j jumps as a window; when the walk
    -- reaches its end, one more jump opens the next window.
    go [] jumps _ _ = jumps
    go ((i, n) : rest) jumps end furthest
      | i == end = go rest (jumps + 1) furthest' furthest'
      | otherwise = go rest jumps end furthest'
      where
        furthest' = max furthest (i + n)
