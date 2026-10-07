module Solution where

-- Three states carried day to day: holding a share, just sold (must cool
-- down tomorrow), and free to buy.
maxProfit :: [Int] -> Int
maxProfit prices = finish (foldl step (-2147483648, 0, 0) prices)
  where
    step (holding, cooling, free) price = (max holding (free - price), holding + price, max free cooling)
    finish (_, cooling, free) = max cooling free
