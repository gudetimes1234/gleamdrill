module Solution where

import qualified Data.IntMap.Strict as IntMap

-- A map from key to (value, stamp) plus a map from stamp to key, kept
-- in step by a ticking clock: the smallest stamp is the least recently
-- used, so get, put and evict are each a couple of log-time map
-- operations -- the pure counterpart of the map + doubly linked list.
data LRUCache = LRUCache Int Int (IntMap.IntMap (Int, Int)) (IntMap.IntMap Int)

newCache :: Int -> LRUCache
newCache capacity = LRUCache capacity 0 IntMap.empty IntMap.empty

get :: Int -> LRUCache -> (Int, LRUCache)
get key cache@(LRUCache _ _ entries _) = case IntMap.lookup key entries of
  Nothing -> (-1, cache)
  Just (value, _) -> (value, touch key value cache)

put :: Int -> Int -> LRUCache -> LRUCache
put key value cache@(LRUCache capacity _ entries _)
  | IntMap.member key entries = touch key value cache
  | IntMap.size entries == capacity = touch key value (evict cache)
  | otherwise = touch key value cache

-- touch makes key the most recent: its old stamp leaves the recency
-- map and the clock's fresh stamp takes its place.
touch :: Int -> Int -> LRUCache -> LRUCache
touch key value (LRUCache capacity clock entries recency) =
  LRUCache capacity (clock + 1) (IntMap.insert key (value, clock) entries) stamped
  where
    cleared = case IntMap.lookup key entries of
      Just (_, stamp) -> IntMap.delete stamp recency
      Nothing -> recency
    stamped = IntMap.insert clock key cleared

evict :: LRUCache -> LRUCache
evict cache@(LRUCache capacity clock entries recency) = case IntMap.minView recency of
  Nothing -> cache
  Just (oldest, rest) -> LRUCache capacity clock (IntMap.delete oldest entries) rest
