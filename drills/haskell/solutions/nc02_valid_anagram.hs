module Solution where

import qualified Data.Map.Strict as Map

isAnagram :: String -> String -> Bool
isAnagram s t = counts s == counts t
  where
    counts str = Map.fromListWith (+) [(c, 1 :: Int) | c <- str]
