module Solution where

import Data.Array
import Data.List (sort)

threeSum :: [Int] -> [[Int]]
threeSum nums = concatMap triples [0 .. n - 1]
  where
    n = length nums
    arr = listArray (0, n - 1) (sort nums)
    triples i
      | i > 0 && arr ! i == arr ! (i - 1) = []
      | otherwise = go (i + 1) (n - 1)
      where
        go left right
          | left >= right = []
          | total < 0 = go (left + 1) right
          | total > 0 = go left (right - 1)
          | otherwise = [arr ! i, arr ! left, arr ! right] : go (skipDuplicates (left + 1) right) right
          where
            total = arr ! i + arr ! left + arr ! right
        skipDuplicates left right
          | left < right && arr ! left == arr ! (left - 1) = skipDuplicates (left + 1) right
          | otherwise = left
