module Solution where

import Data.Array

-- Treat i -> nums[i] as a linked list: values in 1..n over indices
-- 0..n means a duplicate is a node with two incoming links, the start
-- of a cycle. Floyd's algorithm finds it with no extra memory.
findDuplicate :: [Int] -> Int
findDuplicate nums = meet (next ! 0) (next ! (next ! 0))
  where
    next = listArray (0, length nums - 1) nums
    meet slow fast
      | slow == fast = finish 0 fast
      | otherwise = meet (next ! slow) (next ! (next ! fast))
    finish slow fast
      | slow == fast = slow
      | otherwise = finish (next ! slow) (next ! fast)
