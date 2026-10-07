module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "mergeKLists [[1,4,5],[1,3,4],[2,6]]" [1, 1, 2, 3, 4, 4, 5, 6] (mergeKLists [[1, 4, 5], [1, 3, 4], [2, 6]])
       , tc "mergeKLists [] -- no lists at all" [] (mergeKLists [])
       , tc "mergeKLists [[]] -- one empty list" [] (mergeKLists [[]])
       , tc "mergeKLists [[1],[],[0]]" [0, 1] (mergeKLists [[1], [], [0]])
       , tc "mergeKLists [[2,2],[2]] -- ties everywhere" [2, 2, 2] (mergeKLists [[2, 2], [2]])
       ])
