module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxPathSum (tree [1,2,3])" 6 (maxPathSum (tree (map Just [1, 2, 3])))
       , tc "maxPathSum (tree [-10,9,20,x,x,15,7])" 42 (maxPathSum (tree [Just (-10), Just 9, Just 20, x, x, Just 15, Just 7]))
       , tc "maxPathSum (tree [-3]) -- a single negative node" (-3) (maxPathSum (tree [Just (-3)]))
       , tc "maxPathSum (tree [-2,-1]) -- all negative" (-1) (maxPathSum (tree (map Just [-2, -1])))
       , tc "maxPathSum (tree [0])" 0 (maxPathSum (tree [Just 0]))
       ])
