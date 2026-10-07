module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "partitionLabels \"ababcbacadefegdehijhklij\"" [9, 7, 8] (partitionLabels "ababcbacadefegdehijhklij")
       , tc "partitionLabels \"eccbbbbdec\"" [10] (partitionLabels "eccbbbbdec")
       , tc "partitionLabels \"abc\"" [1, 1, 1] (partitionLabels "abc")
       , tc "partitionLabels \"a\"" [1] (partitionLabels "a")
       ])
