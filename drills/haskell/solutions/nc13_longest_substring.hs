module Solution where

import qualified Data.Map.Strict as Map

lengthOfLongestSubstring :: String -> Int
lengthOfLongestSubstring s = best
  where
    (_, _, best) = foldl step (Map.empty, 0, 0) (zip [0 ..] s)
    step (lastSeen, start, longest) (i, c) =
      -- Jump the window start past the previous copy of this character;
      -- never backwards, or a stale position would reopen the window.
      let start' = case Map.lookup c lastSeen of
            Just previous | previous >= start -> previous + 1
            _ -> start
      in (Map.insert c i lastSeen, start', max longest (i - start' + 1))
