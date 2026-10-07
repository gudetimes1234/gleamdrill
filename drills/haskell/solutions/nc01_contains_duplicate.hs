module Solution where

import qualified Data.Set as Set

containsDuplicate :: [Int] -> Bool
containsDuplicate nums = go Set.empty nums
  where
    go _ [] = False
    go seen (n : rest)
      | Set.member n seen = True
      | otherwise = go (Set.insert n seen) rest
