module Main where

import Drill
import Solution

-- Groups may come back in any order, and so may their members.
main :: IO ()
main =
  runCases
    (pure
       [ tc "groupAnagrams [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]"
           [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]
           (sortGroups (groupAnagrams ["eat", "tea", "tan", "ate", "nat", "bat"]))
       , tc "groupAnagrams []" [] (sortGroups (groupAnagrams []))
       , tc "groupAnagrams [\"a\"]" [["a"]] (sortGroups (groupAnagrams ["a"]))
       ])
