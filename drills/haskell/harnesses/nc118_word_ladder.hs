module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "ladderLength \"hit\" \"cog\" (the full list)" 5 (ladderLength "hit" "cog" ["hot", "dot", "dog", "lot", "log", "cog"])
       , tc "ladderLength \"hit\" \"cog\" (without cog)" 0 (ladderLength "hit" "cog" ["hot", "dot", "dog", "lot", "log"])
       , tc "ladderLength \"a\" \"c\" [\"a\",\"b\",\"c\"]" 2 (ladderLength "a" "c" ["a", "b", "c"])
       , tc "ladderLength \"hit\" \"hit\" [\"hit\"]" 1 (ladderLength "hit" "hit" ["hit"])
       , tc "ladderLength \"hot\" \"dog\" [\"hot\",\"dog\"] -- no bridge" 0 (ladderLength "hot" "dog" ["hot", "dog"])
       ])
