module Solution where

canCompleteCircuit :: [Int] -> [Int] -> Int
canCompleteCircuit gas cost
  | sum diffs < 0 = -1
  | otherwise = fst (foldl step (0, 0) (zip [0 ..] diffs))
  where
    diffs = zipWith (-) gas cost
    -- Running dry here means no start between the last reset and here can
    -- work either: they would all arrive with even less.
    step (start, tank) (i, diff)
      | tank + diff < 0 = (i + 1, 0)
      | otherwise = (start, tank + diff)
