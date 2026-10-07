module Solution where

import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map
import Data.Set (Set)
import qualified Data.Set as Set

-- Each user's tweets newest-first; a feed merges the followed users'
-- lists (plus the user's own) newest-first, k-way-merge style,
-- stopping after ten. A global clock orders tweets across users.
data Twitter = Twitter Int (Map Int [(Int, Int)]) (Map Int (Set Int))

newTwitter :: Twitter
newTwitter = Twitter 0 Map.empty Map.empty

postTweet :: Int -> Int -> Twitter -> Twitter
postTweet userId tweetId (Twitter clock tweets follows) = Twitter (clock + 1) (Map.insertWith (++) userId [(clock + 1, tweetId)] tweets) follows

getNewsFeed :: Int -> Twitter -> [Int]
getNewsFeed userId (Twitter _ tweets follows) = map snd (take 10 (mergeNewest lists))
  where
    followees = Set.toList (Map.findWithDefault Set.empty userId follows)
    sources = userId : filter (/= userId) followees
    lists = [ Map.findWithDefault [] source tweets | source <- sources ]

mergeNewest :: [[(Int, Int)]] -> [(Int, Int)]
mergeNewest lists = case filter (not . null) lists of
  [] -> []
  live -> let newest = maximum (map head live) in newest : mergeNewest (dropOne newest live)
  where
    dropOne _ [] = []
    dropOne entry ((top : rest) : more)
      | top == entry = rest : more
    dropOne entry (list : more) = list : dropOne entry more

follow :: Int -> Int -> Twitter -> Twitter
follow followerId followeeId (Twitter clock tweets follows) = Twitter clock tweets (Map.insertWith Set.union followerId (Set.singleton followeeId) follows)

unfollow :: Int -> Int -> Twitter -> Twitter
unfollow followerId followeeId (Twitter clock tweets follows) = Twitter clock tweets (Map.adjust (Set.delete followeeId) followerId follows)
