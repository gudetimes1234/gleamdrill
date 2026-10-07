module Main where

import Prelude hiding (reverse)

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "reverse 123" 321 (reverse 123)
       , tc "reverse (-123)" (-321) (reverse (-123))
       , tc "reverse 120" 21 (reverse 120)
       , tc "reverse 0" 0 (reverse 0)
       , tc "reverse 1534236469 -- overflows" 0 (reverse 1534236469)
       , tc "reverse (-2147483648) -- overflows" 0 (reverse (-2147483648))
       , tc "reverse 1463847412" 2147483641 (reverse 1463847412)
       ])
