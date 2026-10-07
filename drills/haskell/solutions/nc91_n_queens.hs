module Solution where

import qualified Data.Set as Set

-- r - c is constant along one diagonal, r + c along the other; a row's
-- queen goes into any column none of the three sets claims.
solveNQueens :: Int -> [[String]]
solveNQueens n = place 0 Set.empty Set.empty Set.empty []
  where
    place r cols diagonals antiDiagonals queens
      | r == n = [render (reverse queens)]
      | otherwise =
          concat
            [ place (r + 1) (Set.insert c cols) (Set.insert (r - c) diagonals) (Set.insert (r + c) antiDiagonals) (c : queens)
            | c <- [0 .. n - 1]
            , not (Set.member c cols)
            , not (Set.member (r - c) diagonals)
            , not (Set.member (r + c) antiDiagonals)
            ]
    render queens = [replicate c '.' ++ "Q" ++ replicate (n - c - 1) '.' | c <- queens]
