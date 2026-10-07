module Solution where

import Data.Array (listArray, (!))
import qualified Data.Set as Set

-- breakable ! i: can the first i characters be segmented? True when
-- some word ends at i and the prefix before it was breakable.
wordBreak :: String -> [String] -> Bool
wordBreak s wordDict = breakable ! n
  where
    n = length s
    dictionary = Set.fromList wordDict
    breakable = listArray (0, n) [ ok end | end <- [0 .. n] ]
    ok 0 = True
    ok end = or [ breakable ! start && Set.member (slice start end) dictionary | start <- [0 .. end - 1] ]
    slice from to = take (to - from) (drop from s)
