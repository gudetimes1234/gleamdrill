module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

roundTrip :: [Maybe Int] -> Tree
roundTrip values = deserialize (serialize (tree values))

-- The Go harness's lopsided tree, padded to the level-order slots the
-- Drill builder indexes: 1(2(3(_,4), _), _).
lopsided :: [Maybe Int]
lopsided = [Just 1, Just 2, x, Just 3, x, x, x, x, Just 4]

main :: IO ()
main =
  runCases
    (pure
       [ tc "deserialize (serialize (tree [1,2,3,x,x,4,5]))" (tree [Just 1, Just 2, Just 3, x, x, Just 4, Just 5]) (roundTrip [Just 1, Just 2, Just 3, x, x, Just 4, Just 5])
       , tc "deserialize (serialize (tree []))" (tree []) (roundTrip [])
       , tc "deserialize (serialize (tree [0]))" (tree [Just 0]) (roundTrip [Just 0])
       , tc "deserialize (serialize (a lopsided tree))" (tree lopsided) (roundTrip lopsided)
       , tc "deserialize (serialize (tree [-1,-2,-3])) -- negatives survive" (tree (map Just [-1, -2, -3])) (roundTrip (map Just [-1, -2, -3]))
       ])
