import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let base =
    solution.new()
    |> solution.post_tweet(1, 5)

  let followed =
    base
    |> solution.follow(1, 2)
    |> solution.post_tweet(2, 6)

  let unfollowed = solution.unfollow(followed, 1, 2)

  let eleven =
    solution.new()
    |> solution.post_tweet(1, 1)
    |> solution.post_tweet(1, 2)
    |> solution.post_tweet(1, 3)
    |> solution.post_tweet(1, 4)
    |> solution.post_tweet(1, 5)
    |> solution.post_tweet(1, 6)
    |> solution.post_tweet(1, 7)
    |> solution.post_tweet(1, 8)
    |> solution.post_tweet(1, 9)
    |> solution.post_tweet(1, 10)
    |> solution.post_tweet(1, 11)

  [
    #(
      "news_feed(1) after posting 5",
      string.inspect([5]),
      string.inspect(solution.news_feed(base, 1)),
    ),
    #(
      "news_feed(1) after following 2 who posted 6",
      string.inspect([6, 5]),
      string.inspect(solution.news_feed(followed, 1)),
    ),
    #(
      "news_feed(1) after unfollowing 2",
      string.inspect([5]),
      string.inspect(solution.news_feed(unfollowed, 1)),
    ),
    #(
      "news_feed(2) sees only its own",
      string.inspect([6]),
      string.inspect(solution.news_feed(followed, 2)),
    ),
    #(
      "news_feed(3) for a user with nothing",
      string.inspect([]),
      string.inspect(solution.news_feed(followed, 3)),
    ),
    #(
      "news_feed caps at ten, newest first",
      string.inspect([11, 10, 9, 8, 7, 6, 5, 4, 3, 2]),
      string.inspect(solution.news_feed(eleven, 1)),
    ),
  ]
}
