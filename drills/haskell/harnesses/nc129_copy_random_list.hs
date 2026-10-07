module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "copyRandomList [(7,-1),(13,0)]" [(7, -1), (13, 0)] (copyRandomList [(7, -1), (13, 0)])
       , tc "copyRandomList [(1,0)] -- a node pointing at itself" [(1, 0)] (copyRandomList [(1, 0)])
       , tc "copyRandomList (a forward link to a node not yet copied)" [(1, 2), (2, -1), (3, 0)] (copyRandomList [(1, 2), (2, -1), (3, 0)])
       , tc "copyRandomList []" [] (copyRandomList [])
       ])
