module Solution where

import Data.List (transpose)

-- Transpose, then reverse each row: together they are a quarter turn
-- clockwise.
rotate :: [[Int]] -> [[Int]]
rotate = map reverse . transpose
