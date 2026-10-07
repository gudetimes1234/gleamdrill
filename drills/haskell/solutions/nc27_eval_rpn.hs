module Solution where

-- Operands go on the stack; an operator pops its two arguments and
-- pushes the result. `quot` truncates toward zero, as the problem asks.
evalRPN :: [String] -> Int
evalRPN tokens = head (foldl step [] tokens)
  where
    step (b : a : rest) "+" = a + b : rest
    step (b : a : rest) "-" = a - b : rest
    step (b : a : rest) "*" = a * b : rest
    step (b : a : rest) "/" = a `quot` b : rest
    step stack token = read token : stack
