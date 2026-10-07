module Solution where

import qualified Data.Set as Set

isHappy :: Int -> Bool
isHappy = go Set.empty
  where
    -- The digit-square walk either reaches 1 or falls into a cycle; the
    -- seen set catches the cycle.
    go seen n
      | n == 1 = True
      | n `Set.member` seen = False
      | otherwise = go (Set.insert n seen) (digitSquareSum n)

digitSquareSum :: Int -> Int
digitSquareSum 0 = 0
digitSquareSum n = (n `mod` 10) * (n `mod` 10) + digitSquareSum (n `div` 10)
