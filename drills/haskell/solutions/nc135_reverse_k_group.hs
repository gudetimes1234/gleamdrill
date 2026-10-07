module Solution where

-- Take k at a time: a full group is reversed, a short final one is
-- left as it is -- the pointer surgery of the linked-list version
-- without the pointers.
reverseKGroup :: [Int] -> Int -> [Int]
reverseKGroup values k
  | length group == k = reverse group ++ reverseKGroup rest k
  | otherwise = values
  where
    (group, rest) = splitAt k values
