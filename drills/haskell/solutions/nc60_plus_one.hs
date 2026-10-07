module Solution where

plusOne :: [Int] -> [Int]
plusOne digits = if carry then 1 : grown else grown
  where
    -- Carry from the right; a 9 becomes 0 and the carry moves on. If the
    -- carry survives every digit, the number grew a digit.
    (carry, grown) = foldr step (True, []) digits
    step 9 (True, rest) = (True, 0 : rest)
    step d (True, rest) = (False, d + 1 : rest)
    step d (False, rest) = (False, d : rest)
