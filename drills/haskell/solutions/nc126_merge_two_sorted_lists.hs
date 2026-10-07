module Solution where

-- Take the smaller head each time; when one side runs out, the other
-- is already sorted and comes along whole.
mergeTwoLists :: [Int] -> [Int] -> [Int]
mergeTwoLists [] list2 = list2
mergeTwoLists list1 [] = list1
mergeTwoLists (a : as) (b : bs)
  | a <= b = a : mergeTwoLists as (b : bs)
  | otherwise = b : mergeTwoLists (a : as) bs
