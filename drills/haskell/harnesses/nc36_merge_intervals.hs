module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "merge [[1,3],[2,6],[8,10],[15,18]]" [[1, 6], [8, 10], [15, 18]] (merge [[1, 3], [2, 6], [8, 10], [15, 18]])
       , tc "merge [[1,4],[4,5]]" [[1, 5]] (merge [[1, 4], [4, 5]])
       , tc "merge [[1,4],[0,4]]" [[0, 4]] (merge [[1, 4], [0, 4]])
       , tc "merge []" [] (merge [])
       , tc "merge [[1,4],[2,3]]" [[1, 4]] (merge [[1, 4], [2, 3]])
       ])
