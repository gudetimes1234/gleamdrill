module Solution where

import qualified Data.IntMap.Strict as IntMap

dailyTemperatures :: [Int] -> [Int]
dailyTemperatures temperatures =
  [IntMap.findWithDefault 0 i answers | i <- [0 .. length temperatures - 1]]
  where
    -- The stack holds (index, temperature) pairs still waiting for a
    -- warmer day, temperatures decreasing toward the top.
    (_, answers) = foldl step ([], IntMap.empty) (zip [0 ..] temperatures)
    step (stack, found) (i, t) =
      let (resolved, waiting) = span (\(_, cooler) -> cooler < t) stack
          found' = foldl (\m (j, _) -> IntMap.insert j (i - j) m) found resolved
      in ((i, t) : waiting, found')
