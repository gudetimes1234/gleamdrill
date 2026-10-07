module Main where

import qualified Data.Map.Strict as Map
import Drill
import Solution

-- Letters no rule orders may come in any order, so a result is checked
-- against the rules rather than against one string.
consistent :: [String] -> Int -> Bool
consistent ws expectedLetters = length order == expectedLetters && all holds (zip ws (drop 1 ws))
  where
    order = alienOrder ws
    position = Map.fromList (zip order [0 :: Int ..])
    at c = Map.findWithDefault 0 c position
    holds (a, b) = case dropWhile (uncurry (==)) (zip a b) of
      ((c, d) : _) -> at c <= at d
      [] -> True

main :: IO ()
main =
  runCases
    (pure
       [ tc "alienOrder [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]" "wertf" (alienOrder ["wrt", "wrf", "er", "ett", "rftt"])
       , tc "alienOrder [\"z\",\"x\"]" "zx" (alienOrder ["z", "x"])
       , tc "alienOrder [\"z\",\"x\",\"z\"] -- contradictory" "" (alienOrder ["z", "x", "z"])
       , tc "alienOrder [\"abc\",\"ab\"] -- a word before its own prefix" "" (alienOrder ["abc", "ab"])
       , tc "alienOrder [\"z\",\"z\"]" "z" (alienOrder ["z", "z"])
       , tc "alienOrder [\"ac\",\"ab\",\"zc\",\"zb\"] respects every rule" True (consistent ["ac", "ab", "zc", "zb"] 4)
       ])
