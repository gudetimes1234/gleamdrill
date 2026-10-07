module Solution where

import Data.List (insert, insertBy)

-- The lower half in a descending list (its head the max-heap's top),
-- the upper half in an ascending list, the lower allowed one extra:
-- the median is the lower's head, or the mean of both heads.
data MedianFinder = MedianFinder [Int] [Int]

newMedianFinder :: MedianFinder
newMedianFinder = MedianFinder [] []

addNum :: Int -> MedianFinder -> MedianFinder
addNum num (MedianFinder lower upper)
  | length pushedUpper > length lowerRest = MedianFinder (insertBy (flip compare) (head pushedUpper) lowerRest) (drop 1 pushedUpper)
  | otherwise = MedianFinder lowerRest pushedUpper
  where
    pushedLower = insertBy (flip compare) num lower
    lowerRest = drop 1 pushedLower
    pushedUpper = insert (head pushedLower) upper

findMedian :: MedianFinder -> Double
findMedian (MedianFinder [] _) = 0
findMedian (MedianFinder lower upper)
  | length lower > length upper = fromIntegral (head lower)
  | otherwise = fromIntegral (head lower + head upper) / 2
