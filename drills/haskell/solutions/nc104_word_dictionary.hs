module Solution where

import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map

-- A trie; a dot in the query branches into every child at that depth.
data WordDictionary = WordDictionary Bool (Map Char WordDictionary)

emptyDictionary :: WordDictionary
emptyDictionary = WordDictionary False Map.empty

addWord :: String -> WordDictionary -> WordDictionary
addWord [] (WordDictionary _ children) = WordDictionary True children
addWord (c : rest) (WordDictionary terminal children) = WordDictionary terminal (Map.insert c (addWord rest next) children)
  where
    next = Map.findWithDefault emptyDictionary c children

search :: String -> WordDictionary -> Bool
search [] (WordDictionary terminal _) = terminal
search ('.' : rest) (WordDictionary _ children) = any (search rest) (Map.elems children)
search (c : rest) (WordDictionary _ children) = maybe False (search rest) (Map.lookup c children)
