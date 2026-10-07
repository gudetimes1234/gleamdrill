module Solution where

import qualified Data.Map.Strict as Map

isNStraightHand :: [Int] -> Int -> Bool
isNStraightHand hand groupSize
  | length hand `mod` groupSize /= 0 = False
  | otherwise = deal (Map.fromListWith (+) [(card, 1 :: Int) | card <- hand])
  where
    -- The smallest remaining card must start a group; take the run above
    -- it, one of each, or the hand cannot be dealt.
    deal counts = case Map.lookupMin counts of
      Nothing -> True
      Just (card, _) -> maybe False deal (takeRun card groupSize counts)
    takeRun _ 0 counts = Just counts
    takeRun card k counts = case Map.lookup card counts of
      Nothing -> Nothing
      Just 1 -> takeRun (card + 1) (k - 1) (Map.delete card counts)
      Just n -> takeRun (card + 1) (k - 1) (Map.insert card (n - 1) counts)
