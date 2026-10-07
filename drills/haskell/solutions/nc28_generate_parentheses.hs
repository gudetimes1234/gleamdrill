module Solution where

generateParenthesis :: Int -> [String]
generateParenthesis n = build 0 0
  where
    -- An opener is allowed while some remain; a closer only while it
    -- would not outnumber the openers so far.
    build open closed
      | open == n && closed == n = [""]
      | otherwise =
          ['(' : rest | open < n, rest <- build (open + 1) closed]
            ++ [')' : rest | closed < open, rest <- build open (closed + 1)]
