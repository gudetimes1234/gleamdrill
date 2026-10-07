module Solution where

import Data.List (insert)

-- An ascending list of the k largest seen so far -- the pure form of
-- the Go min-heap; its head, the smallest kept, is the kth largest.
data KthLargest = KthLargest Int [Int]

newKthLargest :: Int -> [Int] -> KthLargest
newKthLargest k nums = foldl (\store n -> fst (add n store)) (KthLargest k []) nums

add :: Int -> KthLargest -> (KthLargest, Int)
add val (KthLargest k keep) = (KthLargest k trimmed, head trimmed)
  where
    grown = insert val keep
    trimmed = if length grown > k then drop 1 grown else grown
