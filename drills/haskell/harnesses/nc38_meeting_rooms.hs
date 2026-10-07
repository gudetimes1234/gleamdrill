module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "canAttendMeetings [[0,30],[5,10],[15,20]]" False (canAttendMeetings [[0, 30], [5, 10], [15, 20]])
       , tc "canAttendMeetings [[7,10],[2,4]]" True (canAttendMeetings [[7, 10], [2, 4]])
       , tc "canAttendMeetings []" True (canAttendMeetings [])
       , tc "canAttendMeetings [[1,5],[5,10]]" True (canAttendMeetings [[1, 5], [5, 10]])
       , tc "canAttendMeetings [[5,10],[1,6]]" False (canAttendMeetings [[5, 10], [1, 6]])
       ])
