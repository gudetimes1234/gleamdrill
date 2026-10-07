module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "dailyTemperatures [73, 74, 75, 71, 69, 72, 76, 73]" [1, 1, 4, 2, 1, 1, 0, 0] (dailyTemperatures [73, 74, 75, 71, 69, 72, 76, 73])
       , tc "dailyTemperatures [30, 40, 50, 60]" [1, 1, 1, 0] (dailyTemperatures [30, 40, 50, 60])
       , tc "dailyTemperatures [30, 60, 90]" [1, 1, 0] (dailyTemperatures [30, 60, 90])
       , tc "dailyTemperatures [90]" [0] (dailyTemperatures [90])
       ])
