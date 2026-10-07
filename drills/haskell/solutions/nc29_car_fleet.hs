module Solution where

import Data.List (sortOn)
import Data.Ord (Down(..))

carFleet :: Int -> [Int] -> [Int] -> Int
carFleet target position speed = fst (foldl step (0, 0.0) arrivals)
  where
    -- Closest to the target first. A car that would arrive sooner than the
    -- fleet ahead is stuck behind it and joins; one that arrives later
    -- starts a new fleet.
    cars = sortOn (Down . fst) (zip position speed)
    arrivals = [fromIntegral (target - p) / fromIntegral v :: Double | (p, v) <- cars]
    step (fleets, slowest) arrival
      | arrival > slowest = (fleets + 1, arrival)
      | otherwise = (fleets, slowest)
