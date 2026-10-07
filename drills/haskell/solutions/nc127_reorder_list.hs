module Solution where

-- Split at the middle, reverse the second half, then interleave the
-- two -- the same three steps as the pointer version, returned as a
-- new list instead of rewiring in place.
reorderList :: [Int] -> [Int]
reorderList values = interleave front (reverse back)
  where
    (front, back) = splitAt ((length values + 1) `div` 2) values
    interleave [] _ = []
    interleave firsts [] = firsts
    interleave (a : as) (b : bs) = a : b : interleave as bs
