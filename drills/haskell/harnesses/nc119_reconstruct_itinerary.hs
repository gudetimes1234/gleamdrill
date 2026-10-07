module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       [ tc "findItinerary (MUC/LHR/SFO/SJC chain)" ["JFK", "MUC", "LHR", "SFO", "SJC"] (findItinerary [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]])
       , tc "findItinerary (two ways out of JFK -- smallest first)" ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"] (findItinerary [["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]])
       , tc "findItinerary (KUL is a dead end, so it must come last)" ["JFK", "NRT", "JFK", "KUL"] (findItinerary [["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]])
       , tc "findItinerary []" ["JFK"] (findItinerary [])
       ])
