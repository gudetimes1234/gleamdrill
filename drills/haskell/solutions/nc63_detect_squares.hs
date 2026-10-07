module Solution where

import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map

-- Count each point; for a query, every stored point on a diagonal from it
-- (|dx| == |dy| /= 0) fixes a square whose other two corners are then
-- looked up by count.
type DetectSquares = Map (Int, Int) Int

newDetectSquares :: DetectSquares
newDetectSquares = Map.empty

add :: (Int, Int) -> DetectSquares -> DetectSquares
add point counts = Map.insertWith (+) point 1 counts

count :: (Int, Int) -> DetectSquares -> Int
count (x, y) counts = sum [ n * at (x + dx, y) * at (x, y + dy) | ((cx, cy), n) <- Map.toList counts, let dx = cx - x, let dy = cy - y, dx /= 0, abs dx == abs dy ]
  where
    at corner = Map.findWithDefault 0 corner counts
