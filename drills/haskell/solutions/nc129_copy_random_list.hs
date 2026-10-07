module Solution where

import qualified Data.IntMap.Strict as IntMap

-- Nodes as (value, random index or -1). Two passes with a map from
-- original position to its copy: make every copy first, then wire each
-- node through the map, so a random link pointing forward finds its
-- copy already made.
copyRandomList :: [(Int, Int)] -> [(Int, Int)]
copyRandomList nodes = [(copies IntMap.! i, random) | (i, (_, random)) <- indexed]
  where
    indexed = zip [0 ..] nodes
    copies = IntMap.fromList [(i, value) | (i, (value, _)) <- indexed]
