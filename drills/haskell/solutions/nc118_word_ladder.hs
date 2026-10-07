module Solution where

import Data.List (foldl')
import qualified Data.Set as Set

-- Breadth-first over words, generating each neighbour by changing one
-- letter and keeping the ones in the list. Level = ladder length.
ladderLength :: String -> String -> [String] -> Int
ladderLength beginWord endWord wordList
  | not (Set.member endWord pool) = 0
  | otherwise = go [beginWord] (Set.delete beginWord pool) 1
  where
    pool = Set.fromList wordList
    go [] _ _ = 0
    go queue unseen levels
      | endWord `elem` queue = levels
      | otherwise = let (next, unseen') = foldl' expand ([], unseen) queue in go next unseen' (levels + 1)
    expand acc word = foldl' claim acc (rewrites word)
    claim (next, unseen) candidate
      | Set.member candidate unseen = (candidate : next, Set.delete candidate unseen)
      | otherwise = (next, unseen)
    rewrites word = [before ++ [letter] ++ drop 1 after | i <- [0 .. length word - 1], let (before, after) = splitAt i word, letter <- ['a' .. 'z']]
