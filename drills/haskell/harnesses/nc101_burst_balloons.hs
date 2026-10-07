module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "maxCoins [3,1,5,8]" 167 (maxCoins [3, 1, 5, 8])
       , tc "maxCoins [1,5]" 10 (maxCoins [1, 5])
       , tc "maxCoins []" 0 (maxCoins [])
       , tc "maxCoins [5]" 5 (maxCoins [5])
       , tc "maxCoins [1,2,3,4]" 40 (maxCoins [1, 2, 3, 4])
       ])
