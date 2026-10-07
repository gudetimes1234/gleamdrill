module Solution where

import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map

-- One node per prefix; a word's last node is marked terminal, which is
-- what tells search from startsWith.
data Trie = Trie Bool (Map Char Trie)

emptyTrie :: Trie
emptyTrie = Trie False Map.empty

insert :: String -> Trie -> Trie
insert [] (Trie _ children) = Trie True children
insert (c : rest) (Trie terminal children) = Trie terminal (Map.insert c (insert rest next) children)
  where
    next = Map.findWithDefault emptyTrie c children

search :: String -> Trie -> Bool
search word trie = maybe False isTerminal (walk word trie)
  where
    isTerminal (Trie terminal _) = terminal

startsWith :: String -> Trie -> Bool
startsWith prefix trie = maybe False (const True) (walk prefix trie)

walk :: String -> Trie -> Maybe Trie
walk [] trie = Just trie
walk (c : rest) (Trie _ children) = Map.lookup c children >>= walk rest
