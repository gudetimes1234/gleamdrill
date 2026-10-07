module Solution where

import Data.List (intercalate)
import Drill

-- Pre-order with an explicit marker for a missing child: the reader
-- consumes tokens in the same order the writer produced them, so no
-- lengths are needed.
serialize :: Tree -> String
serialize root = intercalate "," (write root)
  where
    write Leaf = ["#"]
    write (Node left v right) = show v : write left ++ write right

deserialize :: String -> Tree
deserialize input = fst (next (splitOn ',' input))
  where
    next ("#" : rest) = (Leaf, rest)
    next (token : rest) =
      let (left, afterLeft) = next rest
          (right, afterRight) = next afterLeft
      in (Node left (read token) right, afterRight)
    next [] = (Leaf, [])

splitOn :: Char -> String -> [String]
splitOn sep s = case break (== sep) s of
  (piece, []) -> [piece]
  (piece, _ : rest) -> piece : splitOn sep rest
