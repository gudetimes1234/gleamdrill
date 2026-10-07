module Solution where

import qualified Data.Map.Strict as Map

partitionLabels :: String -> [Int]
partitionLabels s = go (zip [0 ..] s) 0 0
  where
    -- A part must run at least to the last occurrence of every letter in
    -- it; when the walk reaches that furthest point, the part closes.
    lastIndex = Map.fromList (zip s [0 ..])
    go [] _ _ = []
    go ((i, ch) : rest) start end
      | i == furthest = (furthest - start + 1) : go rest (i + 1) (i + 1)
      | otherwise = go rest start furthest
      where
        furthest = max end (lastIndex Map.! ch)
