module Solution where

-- Square and multiply: each bit of n either contributes the current
-- power or not, and the power squares as the bits move up.
myPow :: Double -> Int -> Double
myPow x n
  | n < 0 = go 1 (1 / x) (negate n)
  | otherwise = go 1 x n
  where
    go result _ 0 = result
    go result base e
      | odd e = go (result * base) (base * base) (e `div` 2)
      | otherwise = go result (base * base) (e `div` 2)
