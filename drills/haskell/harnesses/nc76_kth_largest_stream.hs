module Main where

import Drill
import Solution

stream :: Int -> [Int] -> [Int] -> [Int]
stream k initial added = reverse (snd (foldl step (newKthLargest k initial, []) added))
  where
    step (store, out) n = let (grown, top) = add n store in (grown, top : out)

main :: IO ()
main =
  runCases
    (pure
       [ tc "k = 3 over [4, 5, 8, 2] then 3, 5, 10, 9, 4" [4, 5, 5, 8, 8] (stream 3 [4, 5, 8, 2] [3, 5, 10, 9, 4])
       , tc "k = 1 over [] then 1, 2, 0" [1, 2, 2] (stream 1 [] [1, 2, 0])
       , tc "k = 2 over [7] then 5, 5" [5, 5] (stream 2 [7] [5, 5])
       ])
