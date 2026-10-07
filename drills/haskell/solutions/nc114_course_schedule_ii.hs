module Solution where

import Data.Array
import Data.List (foldl')
import qualified Data.Map.Strict as Map

-- Kahn's algorithm; the order the courses leave the queue is a valid
-- schedule, and a short one means a cycle.
findOrder :: Int -> [[Int]] -> [Int]
findOrder numCourses prerequisites = if length order == numCourses then order else []
  where
    next = accumArray (flip (:)) [] (0, numCourses - 1) [(p, course) | [course, p] <- prerequisites]
    indegree = Map.fromListWith (+) ([(course, 0) | course <- [0 .. numCourses - 1]] ++ [(course, 1) | [course, _] <- prerequisites])
    ready = [course | course <- [0 .. numCourses - 1], indegree Map.! course == 0]
    order = go indegree ready []
    go _ [] done = reverse done
    go remaining (course : queue) done = go remaining' (queue ++ newlyReady) (course : done)
      where
        (remaining', newlyReady) = foldl' release (remaining, []) (next ! course)
        release (m, zs) dependent =
          let m' = Map.adjust (subtract 1) dependent m
          in (m', if m' Map.! dependent == 0 then zs ++ [dependent] else zs)
