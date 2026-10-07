module Solution where

-- The list as values plus the index the tail links back to (-1 for
-- none). Tortoise and hare over node indices: in a cycle the fast
-- pointer laps the slow one; off the end means no cycle.
hasCycle :: [Int] -> Int -> Bool
hasCycle [] _ = False
hasCycle values pos = go 0 0
  where
    n = length values
    step i
      | i < n - 1 = Just (i + 1)
      | pos >= 0 = Just pos
      | otherwise = Nothing
    go slow fast = case (step slow, step fast >>= step) of
      (Just s, Just f) -> s == f || go s f
      _ -> False
