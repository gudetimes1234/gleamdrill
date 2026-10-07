module Solution where

import Data.List (transpose)

-- Peel the top row; reversing the transpose of what remains turns it a
-- quarter counterclockwise, so the old right column becomes the next top
-- row. Same ring-by-ring peel as the bounds walk, without the bounds.
spiralOrder :: [[Int]] -> [Int]
spiralOrder [] = []
spiralOrder (row : rest) = row ++ spiralOrder (reverse (transpose rest))
