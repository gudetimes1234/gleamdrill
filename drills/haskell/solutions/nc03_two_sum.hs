module Solution where

import qualified Data.Map.Strict as Map

twoSum :: [Int] -> Int -> [Int]
twoSum nums target = go Map.empty (zip [0 ..] nums)
  where
    go _ [] = []
    go seen ((i, n) : rest) = case Map.lookup (target - n) seen of
      Just j -> [j, i]
      Nothing -> go (Map.insert n i seen) rest
