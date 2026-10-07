module Solution where

import Data.Array
import qualified Data.Map.Strict as Map

minWindow :: String -> String -> String
minWindow s t
  | null t || length t > length s = ""
  | otherwise = maybe "" cut best
  where
    arr = listArray (0, length s - 1) s
    need0 = Map.fromListWith (+) [(c, 1 :: Int) | c <- t]
    (_, _, _, best) = foldl step (need0, length t, 0, Nothing) (zip [0 ..] s)
    step (need, missing, start, found) (end, c) =
      let missing' = if Map.findWithDefault 0 c need > 0 then missing - 1 else missing
          need' = Map.insertWith (+) c (-1) need
      in shrink need' missing' start end found
    -- Once every character is covered, shrink from the left as far as
    -- the coverage allows, recording the window each time.
    shrink need missing start end found
      | missing > 0 = (need, missing, start, found)
      | otherwise =
          let found' = case found of
                Just (_, size) | end - start + 1 >= size -> found
                _ -> Just (start, end - start + 1)
              leaving = arr ! start
              need' = Map.insertWith (+) leaving 1 need
              missing' = if Map.findWithDefault 0 leaving need' > 0 then 1 else 0
          in shrink need' missing' (start + 1) end found'
    cut (start, size) = take size (drop start s)
