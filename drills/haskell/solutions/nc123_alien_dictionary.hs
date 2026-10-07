module Solution where

import qualified Data.Map.Strict as Map
import qualified Data.Set as Set

-- Adjacent words give one ordering each: the first differing letter.
-- Then a topological sort (Kahn) over the letters; a leftover means a cycle.
alienOrder :: [String] -> String
alienOrder ws
  | badPrefix = ""
  | length order /= Map.size indegree = ""
  | otherwise = order
  where
    pairs = zip ws (drop 1 ws)
    badPrefix = any (\(a, b) -> length a > length b && take (length b) a == b) pairs
    firstDiff (a, b) = case dropWhile (uncurry (==)) (zip a b) of
      ((c, d) : _) -> [(c, d)]
      [] -> []
    rules = Set.fromList (concatMap firstDiff pairs)
    next = Map.fromListWith Set.union [(c, Set.singleton d) | (c, d) <- Set.toList rules]
    following c = Set.toAscList (Map.findWithDefault Set.empty c next)
    letters = Set.fromList (concat ws)
    indegree =
      foldr (\(_, d) m -> Map.adjust (+ 1) d m)
        (Map.fromList [(c, 0 :: Int) | c <- Set.toList letters])
        (Set.toList rules)
    order = kahn [c | (c, 0) <- Map.toAscList indegree] indegree
    kahn [] _ = []
    kahn (c : queue) degrees =
      let ready = [d | d <- following c, degrees Map.! d == 1]
          lowered = foldr (Map.adjust (subtract 1)) degrees (following c)
      in c : kahn (queue ++ ready) lowered
