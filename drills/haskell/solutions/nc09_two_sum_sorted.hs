module Solution where

import Data.Array

twoSum :: [Int] -> Int -> [Int]
twoSum numbers target = go 0 (length numbers - 1)
  where
    arr = listArray (0, length numbers - 1) numbers
    go left right
      | left >= right = []
      | total == target = [left + 1, right + 1]
      | total < target = go (left + 1) right
      | otherwise = go left (right - 1)
      where
        total = arr ! left + arr ! right
