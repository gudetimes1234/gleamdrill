module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       (let cache0 = newCache 2
            cache1 = put 1 1 cache0
            cache2 = put 2 2 cache1
            (first, cache3) = get 1 cache2
            cache4 = put 3 3 cache3
            (evicted, cache5) = get 2 cache4
            (kept, cache6) = get 3 cache5
            cache7 = put 4 4 cache6
            (gone, cache8) = get 1 cache7
            (stillThere, cache9) = get 3 cache8
            (newest, _) = get 4 cache9
        in [ tc "get 1 after put 1 1, put 2 2" 1 first
           , tc "get 2 after put 3 3 -- 2 was least recently used" (-1) evicted
           , tc "get 3 after put 3 3" 3 kept
           , tc "get 1 after put 4 4 -- reading 3 saved it, so 1 went" (-1) gone
           , tc "get 3 after put 4 4" 3 stillThere
           , tc "get 4 after put 4 4" 4 newest
           ]))
