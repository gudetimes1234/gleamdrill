module Solution where

import qualified Data.Map.Strict as Map

-- The Go version is a mutable store; here the store is a value that set
-- returns anew and get reads. Timestamps arrive in increasing order, so
-- each key's history is kept newest-first and get takes the first entry
-- at or before the asked-for time.
newtype TimeMap = TimeMap (Map.Map String [(Int, String)])

emptyTimeMap :: TimeMap
emptyTimeMap = TimeMap Map.empty

set :: String -> String -> Int -> TimeMap -> TimeMap
set key value timestamp (TimeMap history) = TimeMap (Map.insertWith (++) key [(timestamp, value)] history)

get :: String -> Int -> TimeMap -> String
get key timestamp (TimeMap history) =
  case [value | (t, value) <- Map.findWithDefault [] key history, t <= timestamp] of
    (value : _) -> value
    [] -> ""
