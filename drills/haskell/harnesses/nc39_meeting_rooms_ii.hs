module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "minMeetingRooms [[0,30],[5,10],[15,20]]" 2 (minMeetingRooms [[0, 30], [5, 10], [15, 20]])
       , tc "minMeetingRooms [[7,10],[2,4]]" 1 (minMeetingRooms [[7, 10], [2, 4]])
       , tc "minMeetingRooms []" 0 (minMeetingRooms [])
       , tc "minMeetingRooms [[1,5],[5,10]]" 1 (minMeetingRooms [[1, 5], [5, 10]])
       , tc "minMeetingRooms (six overlapping meetings)" 4 (minMeetingRooms [[1, 10], [2, 7], [3, 19], [8, 12], [10, 20], [11, 30]])
       ])
