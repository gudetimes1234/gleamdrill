module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "reverseBits 43261596" 964176192 (reverseBits 43261596)
       , tc "reverseBits 4294967293" 3221225471 (reverseBits 4294967293)
       , tc "reverseBits 0" 0 (reverseBits 0)
       , tc "reverseBits 1" 2147483648 (reverseBits 1)
       ])
