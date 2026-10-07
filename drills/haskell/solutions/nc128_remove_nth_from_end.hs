module Solution where

-- Two walks n apart: when the front one runs off the end, the back one
-- stands on the node to drop.
removeNthFromEnd :: [Int] -> Int -> [Int]
removeNthFromEnd values n = go (drop n values) values
  where
    go _ [] = []
    go [] (_ : rest) = rest
    go (_ : front) (v : rest) = v : go front rest
