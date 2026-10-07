module Solution where

findMedianSortedArrays :: [Int] -> [Int] -> Double
findMedianSortedArrays nums1 nums2
  | odd total = fromIntegral current
  | otherwise = fromIntegral (previous + current) / 2
  where
    -- Merge just far enough: the median sits at index (total-1)/2 and
    -- total/2 of the merged order, so stop once those are read.
    total = length nums1 + length nums2
    (previous, current) = go nums1 nums2 (total `div` 2 + 1) (0, 0)
    go _ _ 0 pair = pair
    go xs ys k (_, current') = case (xs, ys) of
      (x : rest, y : _) | x <= y -> go rest ys (k - 1) (current', x)
      (x : rest, []) -> go rest ys (k - 1) (current', x)
      (_, y : rest) -> go xs rest (k - 1) (current', y)
      ([], []) -> (current', current')
