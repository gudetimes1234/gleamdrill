module Solution where

import Data.Array
import Data.List (foldl')
import qualified Data.Map.Strict as Map

-- Kahn's algorithm: repeatedly take a course with no remaining
-- prerequisites. If every course gets taken, there was no cycle.
canFinish :: Int -> [[Int]] -> Bool
canFinish numCourses prerequisites = taken == numCourses
  where
    next = accumArray (flip (:)) [] (0, numCourses - 1) [(p, course) | [course, p] <- prerequisites]
    indegree = Map.fromListWith (+) ([(course, 0) | course <- [0 .. numCourses - 1]] ++ [(course, 1) | [course, _] <- prerequisites])
    ready = [course | course <- [0 .. numCourses - 1], indegree Map.! course == 0]
    taken = go indegree ready 0
    go _ [] count = count
    go remaining (course : queue) count = go remaining' (queue ++ newlyReady) (count + 1)
      where
        (remaining', newlyReady) = foldl' release (remaining, []) (next ! course)
        release (m, zs) dependent =
          let m' = Map.adjust (subtract 1) dependent m
          in (m', if m' Map.! dependent == 0 then zs ++ [dependent] else zs)
