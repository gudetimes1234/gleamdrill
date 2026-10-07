module Solution where

-- Length-prefix each string: "4#code3#abc". The length tells the decoder
-- exactly how far to read, so the strings can contain anything at all.
encode :: [String] -> String
encode = concatMap (\s -> show (length s) ++ "#" ++ s)

decode :: String -> [String]
decode [] = []
decode s = word : decode remaining
  where
    (digits, rest) = break (== '#') s
    (word, remaining) = splitAt (read digits) (drop 1 rest)
