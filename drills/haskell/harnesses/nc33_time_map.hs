module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       (let afterBar = set "foo" "bar" 1 emptyTimeMap
            atOne = get "foo" 1 afterBar
            atThree = get "foo" 3 afterBar
            afterBar2 = set "foo" "bar2" 4 afterBar
        in [ tc "set foo=bar @1; get foo @1" "bar" atOne
           , tc "get foo @3 -- the latest value at or before 3" "bar" atThree
           , tc "set foo=bar2 @4; get foo @4" "bar2" (get "foo" 4 afterBar2)
           , tc "get foo @5" "bar2" (get "foo" 5 afterBar2)
           , tc "get foo @0 -- before any set" "" (get "foo" 0 afterBar2)
           , tc "get missing @1" "" (get "missing" 1 afterBar2)
           ]))
