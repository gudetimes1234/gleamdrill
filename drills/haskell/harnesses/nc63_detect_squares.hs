module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       (let store = add (3, 2) (add (11, 2) (add (3, 10) newDetectSquares))
            oneEach = count (11, 10) store
            noSquare = count (14, 8) store
            withDuplicate = add (11, 2) store
        in [ tc "count (11, 10) with one of each corner" 1 oneEach
           , tc "count (14, 8) -- no square" 0 noSquare
           , tc "count (11, 10) after a duplicate corner" 2 (count (11, 10) withDuplicate)
           , tc "count (3, 10) -- the query point is itself stored" 0 (count (3, 10) withDuplicate)
           ]))
