module Solution where

import Data.Array
import Data.List (foldl')
import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map
import Data.Set (Set)
import qualified Data.Set as Set

-- Put every word in a trie, then walk the board once, descending the
-- trie in step: a dead branch prunes every word sharing that prefix.
-- Found words land in a set, so each is reported once.
data Trie = Trie (Maybe String) (Map Char Trie)

findWords :: [String] -> [String] -> [String]
findWords board wordList = Set.toAscList (foldl' start Set.empty (range bnds))
  where
    rows = length board
    cols = length (head board)
    bnds = ((0, 0), (rows - 1, cols - 1))
    grid = listArray bnds (concat board)
    root = foldl' (flip insertWord) (Trie Nothing Map.empty) wordList
    insertWord w = go w
      where
        go [] (Trie _ children) = Trie (Just w) children
        go (c : rest) (Trie stored children) = Trie stored (Map.insert c (go rest next) children)
          where
            next = Map.findWithDefault (Trie Nothing Map.empty) c children
    start found pos = walk pos root Set.empty found
    walk pos@(r, c) (Trie _ children) visited found =
      case Map.lookup (grid ! pos) children of
        Nothing -> found
        Just next@(Trie stored _) -> foldl' (\acc p -> walk p next visited' acc) found' steps
          where
            found' = maybe found (`Set.insert` found) stored
            visited' = Set.insert pos visited
            steps = [p | p <- [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)], inRange bnds p, not (Set.member p visited')]
