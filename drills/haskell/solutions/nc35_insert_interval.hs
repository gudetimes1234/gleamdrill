module Solution where

insert :: [[Int]] -> [Int] -> [[Int]]
insert intervals newInterval = before ++ absorb (head newInterval) (newInterval !! 1) rest
  where
    -- Everything that ends before the new one starts is untouched;
    -- everything overlapping the new one is absorbed into it.
    (before, rest) = span (\interval -> interval !! 1 < head newInterval) intervals
    absorb s e ((s2 : e2 : _) : more) | s2 <= e = absorb (min s s2) (max e e2) more
    absorb s e more = [s, e] : more
