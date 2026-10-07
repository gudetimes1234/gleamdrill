module Main where

import Drill
import Solution

main :: IO ()
main =
  runCases
    (pure
       (let afterPost = postTweet 1 5 newTwitter
            afterFollow = postTweet 2 6 (follow 1 2 afterPost)
            afterUnfollow = unfollow 1 2 afterFollow
            eleven = foldl (\t i -> postTweet 1 i t) newTwitter [1 .. 11]
        in [ tc "getNewsFeed 1 after posting 5" [5] (getNewsFeed 1 afterPost)
           , tc "getNewsFeed 1 after following 2 who posted 6" [6, 5] (getNewsFeed 1 afterFollow)
           , tc "getNewsFeed 2 sees only its own" [6] (getNewsFeed 2 afterFollow)
           , tc "getNewsFeed 3 for a user with nothing" [] (getNewsFeed 3 afterFollow)
           , tc "getNewsFeed 1 after unfollowing 2" [5] (getNewsFeed 1 afterUnfollow)
           , tc "getNewsFeed 1 caps at the ten most recent" [11, 10, 9, 8, 7, 6, 5, 4, 3, 2] (getNewsFeed 1 eleven)
           ]))
