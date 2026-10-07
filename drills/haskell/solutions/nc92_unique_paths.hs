module Solution where

-- Paths into a cell = paths into the cell above + the cell to the left.
-- One row suffices: the running sum folds the left neighbour into each
-- entry of the row above.
uniquePaths :: Int -> Int -> Int
uniquePaths m n = last (iterate (scanl1 (+)) (replicate n 1) !! (m - 1))
