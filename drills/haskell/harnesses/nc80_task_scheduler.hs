module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "leastInterval \"AAABBB\" 2" 8 (leastInterval "AAABBB" 2)
       , tc "leastInterval \"AAABBB\" 0" 6 (leastInterval "AAABBB" 0)
       , tc "leastInterval \"AAABBB\" 3" 10 (leastInterval "AAABBB" 3)
       , tc "leastInterval \"\" 2" 0 (leastInterval "" 2)
       , tc "leastInterval \"A\" 5" 1 (leastInterval "A" 5)
       , tc "leastInterval \"AAAABCDEFG\" 2 -- four As and six singles" 10 (leastInterval "AAAABCDEFG" 2)
       ])
