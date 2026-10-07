module Solution where

import Data.List (sort)
import qualified Data.Map.Strict as Map

-- A sorted copy of a word is an anagram-invariant key, so one map
-- collects each bucket.
groupAnagrams :: [String] -> [[String]]
groupAnagrams strs = Map.elems (Map.fromListWith (flip (++)) [(sort s, [s]) | s <- strs])
