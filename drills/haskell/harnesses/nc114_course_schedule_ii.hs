module Main where

import qualified Data.Map.Strict as Map
import Drill
import Solution

-- Any order that respects the prerequisites is right, so check the order
-- rather than compare it to one answer.
valid :: Int -> [[Int]] -> Bool
valid numCourses prerequisites = length order == numCourses && all respected prerequisites
  where
    order = findOrder numCourses prerequisites
    position = Map.fromList (zip order [0 :: Int ..])
    respected [course, prerequisite] = position Map.! prerequisite <= position Map.! course
    respected _ = True

main :: IO ()
main =
  runCases
    (pure
       [ tc "findOrder 2 [[1,0]]" [0, 1] (findOrder 2 [[1, 0]])
       , tc "findOrder 4 [[1,0],[2,0],[3,1],[3,2]] is a valid order" True (valid 4 [[1, 0], [2, 0], [3, 1], [3, 2]])
       , tc "findOrder 1 []" [0] (findOrder 1 [])
       , tc "findOrder 2 [[1,0],[0,1]] -- a cycle" [] (findOrder 2 [[1, 0], [0, 1]])
       , tc "findOrder 3 [] is a valid order" True (valid 3 [])
       ])
