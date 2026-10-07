module Solution where

import qualified Data.Map.Strict as Map

checkInclusion :: String -> String -> Bool
checkInclusion s1 s2
  | n > length s2 = False
  | otherwise = any (== need) (scanl slide first steps)
  where
    n = length s1
    need = counts s1
    first = counts (take n s2)
    -- Slide a window of length s1: one character enters, one leaves.
    steps = zip (drop n s2) s2
    slide window (entering, leaving) = remove leaving (Map.insertWith (+) entering 1 window)
    remove c = Map.update (\count -> if count == 1 then Nothing else Just (count - 1)) c
    counts str = Map.fromListWith (+) [(c, 1 :: Int) | c <- str]
