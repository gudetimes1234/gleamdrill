module Solution where

import Data.List (sort)

minMeetingRooms :: [[Int]] -> Int
minMeetingRooms intervals = go starts ends 0 0
  where
    starts = sort (map head intervals)
    ends = sort (map (!! 1) intervals)
    -- Walk the starts in order; a meeting needs a new room unless the
    -- earliest unfinished meeting has ended by then.
    go [] _ _ best = best
    go _ [] _ best = best
    go (s : ss) allEnds@(e : es) rooms best
      | s >= e = go ss es rooms best
      | otherwise = go ss allEnds (rooms + 1) (max best (rooms + 1))
