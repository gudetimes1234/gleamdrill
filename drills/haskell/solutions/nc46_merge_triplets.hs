module Solution where

mergeTriplets :: [[Int]] -> [Int] -> Bool
mergeTriplets triplets target = all hit [0, 1, 2]
  where
    -- A triplet is usable only if no coordinate exceeds the target. Among
    -- usable ones, the max is the target exactly when each coordinate is
    -- hit by at least one of them.
    usable triplet = and (zipWith (<=) triplet target)
    hit i = any (\triplet -> usable triplet && triplet !! i == target !! i) triplets
