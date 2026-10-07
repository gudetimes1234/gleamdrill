module Solution where

import qualified Data.Set as Set

setZeroes :: [[Int]] -> [[Int]]
setZeroes matrix = [[wipe r c v | (c, v) <- zip [0 ..] row] | (r, row) <- zip [0 ..] matrix]
  where
    -- The Go version marks in the matrix's own first row and column; a
    -- pure matrix instead records which rows and columns held a zero,
    -- then rebuilds every cell against those marks.
    zeroRows = Set.fromList [r | (r, row) <- zip [0 :: Int ..] matrix, 0 `elem` row]
    zeroCols = Set.fromList [c | row <- matrix, (c, v) <- zip [0 :: Int ..] row, v == 0]
    wipe r c v = if r `Set.member` zeroRows || c `Set.member` zeroCols then 0 else v
