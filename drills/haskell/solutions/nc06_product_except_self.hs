module Solution where

-- The prefix products from the left, the suffix products from the right;
-- each position is the product of the two scans that exclude it.
productExceptSelf :: [Int] -> [Int]
productExceptSelf nums = zipWith (*) (init (scanl (*) 1 nums)) (tail (scanr (*) 1 nums))
