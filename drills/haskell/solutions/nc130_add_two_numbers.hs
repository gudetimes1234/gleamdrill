module Solution where

-- Digits are least significant first, so add column by column with a
-- carry, like on paper, and keep going while anything remains.
addTwoNumbers :: [Int] -> [Int] -> [Int]
addTwoNumbers = go 0
  where
    go carry [] [] = if carry > 0 then [carry] else []
    go carry l1 l2 =
      let total = carry + headOr0 l1 + headOr0 l2
      in total `mod` 10 : go (total `div` 10) (drop 1 l1) (drop 1 l2)
    headOr0 [] = 0
    headOr0 (v : _) = v
