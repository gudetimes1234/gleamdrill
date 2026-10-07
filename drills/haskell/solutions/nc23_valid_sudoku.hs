module Solution where

import qualified Data.Set as Set

-- Every filled cell claims its digit in a row, a column, and a box; the
-- board is valid exactly when no claim is made twice.
isValidSudoku :: [String] -> Bool
isValidSudoku board = length claims == Set.size (Set.fromList claims)
  where
    cells = [(r, c, digit) | (r, row) <- zip [0 ..] board, (c, digit) <- zip [0 ..] row, digit /= '.']
    claims = concatMap claim cells
    claim (r, c, digit) =
      [ ("row" :: String, r, digit)
      , ("col", c, digit)
      , ("box", (r `div` 3) * 3 + c `div` 3, digit)
      ]
