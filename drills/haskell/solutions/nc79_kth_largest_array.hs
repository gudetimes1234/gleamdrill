module Solution where

import Data.List (insert)

-- An ascending list of size k holds the k largest; its head is the kth.
findKthLargest :: [Int] -> Int -> Int
findKthLargest nums k = head (foldl keep [] nums)
  where
    keep heap n =
      let grown = insert n heap
      in if length grown > k then drop 1 grown else grown
