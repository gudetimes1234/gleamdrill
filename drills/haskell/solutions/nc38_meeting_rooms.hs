module Solution where

import Data.List (sortOn)

canAttendMeetings :: [[Int]] -> Bool
canAttendMeetings intervals = and (zipWith fits sorted (drop 1 sorted))
  where
    -- Sorted by start, only neighbours can collide.
    sorted = sortOn head intervals
    fits earlier later = head later >= earlier !! 1
