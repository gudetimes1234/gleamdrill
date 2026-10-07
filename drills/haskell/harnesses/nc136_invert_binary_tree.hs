module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "invertTree (tree [4,2,7,1,3,6,9])" (tree (map Just [4, 7, 2, 9, 6, 3, 1])) (invertTree (tree (map Just [4, 2, 7, 1, 3, 6, 9])))
       , tc "invertTree (tree []) -- an empty tree" (tree []) (invertTree (tree []))
       , tc "invertTree (tree [1]) -- a single node" (tree [Just 1]) (invertTree (tree [Just 1]))
       , tc "invertTree twice is the original" (tree (map Just [1, 2])) (invertTree (invertTree (tree (map Just [1, 2]))))
       ])
