module Solution where

import Data.List (sort)
import qualified Data.Map.Strict as Map

-- Hierholzer's algorithm for an Eulerian path: from each airport take
-- the smallest unused destination first; an airport is finished once it
-- has no tickets left, and finishing order prepends it to the route, so
-- the route comes out forwards.
findItinerary :: [[String]] -> [String]
findItinerary tickets = snd (visit "JFK" (Map.map sort unused, []))
  where
    unused = Map.fromListWith (++) [(from, [to]) | [from, to] <- tickets]
    visit airport (next, route) =
      case Map.findWithDefault [] airport next of
        [] -> (next, airport : route)
        (destination : rest) -> visit airport (visit destination (Map.insert airport rest next, route))
