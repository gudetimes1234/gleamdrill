module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

main :: IO ()
main =
  runCases
    (pure
       [ tc "isSameTree (tree [1,2,3]) (tree [1,2,3])" True (isSameTree (tree (map Just [1, 2, 3])) (tree (map Just [1, 2, 3])))
       , tc "isSameTree (tree [1,2]) (tree [1,x,2])" False (isSameTree (tree (map Just [1, 2])) (tree [Just 1, x, Just 2]))
       , tc "isSameTree (tree [1,2,1]) (tree [1,1,2])" False (isSameTree (tree (map Just [1, 2, 1])) (tree (map Just [1, 1, 2])))
       , tc "isSameTree (tree []) (tree [])" True (isSameTree (tree []) (tree []))
       , tc "isSameTree (tree [1]) (tree [])" False (isSameTree (tree [Just 1]) (tree []))
       ])
