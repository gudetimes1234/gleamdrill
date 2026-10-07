module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

main :: IO ()
main =
  runCases
    (pure
       [ tc "buildTree [3,9,20,15,7] [9,3,15,20,7]" (tree [Just 3, Just 9, Just 20, x, x, Just 15, Just 7]) (buildTree [3, 9, 20, 15, 7] [9, 3, 15, 20, 7])
       , tc "buildTree [] []" (tree []) (buildTree [] [])
       , tc "buildTree [-1] [-1]" (tree [Just (-1)]) (buildTree [-1] [-1])
       , tc "buildTree [1,2,3] [3,2,1] -- leaning left" (tree [Just 1, Just 2, x, Just 3]) (buildTree [1, 2, 3] [3, 2, 1])
       , tc "buildTree [1,2,3] [1,2,3] -- leaning right" (tree [Just 1, x, Just 2, x, x, x, Just 3]) (buildTree [1, 2, 3] [1, 2, 3])
       ])
