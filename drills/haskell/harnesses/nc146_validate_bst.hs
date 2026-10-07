module Main where

import Drill
import Solution

x :: Maybe Int
x = Nothing

main :: IO ()
main =
  runCases
    (pure
       [ tc "isValidBST (tree [2,1,3])" True (isValidBST (tree (map Just [2, 1, 3])))
       , tc "isValidBST (tree [5,1,4,x,x,3,6])" False (isValidBST (tree [Just 5, Just 1, Just 4, x, x, Just 3, Just 6]))
       , tc "isValidBST (tree [5,4,6,x,x,3,7]) -- the 3 breaks an ancestor's bound" False (isValidBST (tree [Just 5, Just 4, Just 6, x, x, Just 3, Just 7]))
       , tc "isValidBST (tree [2,2,2]) -- equal values are not allowed" False (isValidBST (tree (map Just [2, 2, 2])))
       , tc "isValidBST (tree [])" True (isValidBST (tree []))
       , tc "isValidBST (tree [1])" True (isValidBST (tree [Just 1]))
       ])
