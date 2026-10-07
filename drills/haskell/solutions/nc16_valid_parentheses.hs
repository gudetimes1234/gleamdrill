module Solution where

isValid :: String -> Bool
isValid = go []
  where
    go stack [] = null stack
    go stack (c : rest)
      | c `elem` "([{" = go (c : stack) rest
      | otherwise = case stack of
          (open : deeper) | open == opener c -> go deeper rest
          _ -> False
    opener ')' = '('
    opener ']' = '['
    opener _ = '{'
