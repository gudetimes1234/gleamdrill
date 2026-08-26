base = Solution.new() |> Solution.post_tweet(1, 5)
followed = base |> Solution.follow(1, 2) |> Solution.post_tweet(2, 6)
unfollowed = Solution.unfollow(followed, 1, 2)

eleven =
  Enum.reduce(1..11, Solution.new(), fn tweet, store ->
    Solution.post_tweet(store, 1, tweet)
  end)

[
  {"news_feed(1) after posting 5", inspect([5]), inspect(Solution.news_feed(base, 1))},
  {"news_feed(1) after following 2 who posted 6", inspect([6, 5]),
   inspect(Solution.news_feed(followed, 1))},
  {"news_feed(2) sees only its own", inspect([6]), inspect(Solution.news_feed(followed, 2))},
  {"news_feed(3) for a user with nothing", inspect([]),
   inspect(Solution.news_feed(followed, 3))},
  {"news_feed(1) after unfollowing 2", inspect([5]),
   inspect(Solution.news_feed(unfollowed, 1))},
  {"news_feed caps at ten, newest first", inspect([11, 10, 9, 8, 7, 6, 5, 4, 3, 2]),
   inspect(Solution.news_feed(eleven, 1))}
]
