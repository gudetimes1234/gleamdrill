module Main where

import Drill
import Solution

medians :: [Int] -> [Double]
medians values = reverse (snd (foldl step (newMedianFinder, []) values))
  where
    step (finder, out) v = let grown = addNum v finder in (grown, findMedian grown : out)

main :: IO ()
main =
  runCases
    (pure
       [ tc "medians of 1, 2, 3" [1, 1.5, 2] (medians [1, 2, 3])
       , tc "medians of 1, 2, 3, 4, 5" [1, 1.5, 2, 2.5, 3] (medians [1, 2, 3, 4, 5])
       , tc "medians arriving out of order" [5, 3, 2, 2.5] (medians [5, 1, 2, 3])
       , tc "medians of negatives" [-1, -1.5] (medians [-1, -2])
       , tc "median before anything is added" 0.0 (findMedian newMedianFinder)
       ])
