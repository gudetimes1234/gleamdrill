module Solution where

-- Each digit multiplies the combinations so far by its letters.
letterCombinations :: String -> [String]
letterCombinations [] = []
letterCombinations digits = foldr prepend [""] digits
  where
    prepend digit acc = [ letter : rest | letter <- letters digit, rest <- acc ]
    letters '2' = "abc"
    letters '3' = "def"
    letters '4' = "ghi"
    letters '5' = "jkl"
    letters '6' = "mno"
    letters '7' = "pqrs"
    letters '8' = "tuv"
    letters '9' = "wxyz"
    letters _ = ""
