module Solution where

import qualified Data.IntMap.Strict as IntMap
import Data.List (foldl')

-- Bellman-Ford limited to k+1 rounds: after round i, best holds the
-- cheapest route using at most i flights. Relaxing from the previous
-- round's map keeps a round from chaining two flights.
findCheapestPrice :: Int -> [[Int]] -> Int -> Int -> Int -> Int
findCheapestPrice n flights src dst k
  | answer == unreached = -1
  | otherwise = answer
  where
    unreached = 2 ^ (30 :: Int)
    start = IntMap.insert src 0 (IntMap.fromList [(v, unreached) | v <- [0 .. n - 1]])
    relax previous = foldl' step previous flights
      where
        step best [from, to, price]
          | previous IntMap.! from /= unreached && previous IntMap.! from + price < best IntMap.! to =
              IntMap.insert to (previous IntMap.! from + price) best
        step best _ = best
    answer = iterate relax start !! (k + 1) IntMap.! dst
