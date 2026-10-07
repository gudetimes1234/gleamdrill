module Solution where

maxProfit :: [Int] -> Int
maxProfit [] = 0
maxProfit (first : rest) = snd (foldl step (first, 0) rest)
  where
    step (lowest, best) price = (min lowest price, max best (price - lowest))
