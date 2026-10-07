module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "hammingWeight 11" 3 (hammingWeight 11)
       , tc "hammingWeight 128" 1 (hammingWeight 128)
       , tc "hammingWeight 4294967293" 31 (hammingWeight 4294967293)
       , tc "hammingWeight 0" 0 (hammingWeight 0)
       ])
