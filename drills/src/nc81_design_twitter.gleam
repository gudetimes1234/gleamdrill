import gleam/dict.{type Dict}
import gleam/list
import gleam/result
import gleam/set.{type Set}

pub type Twitter {
  /// `clock` only ever increases, so it orders tweets across every user without
  /// any real timestamps being involved.
  Twitter(
    clock: Int,
    tweets: List(#(Int, Int, Int)),
    following: Dict(Int, Set(Int)),
  )
}

pub fn new() -> Twitter {
  Twitter(0, [], dict.new())
}

pub fn post_tweet(twitter: Twitter, user: Int, tweet: Int) -> Twitter {
  Twitter(
    twitter.clock + 1,
    [#(twitter.clock, user, tweet), ..twitter.tweets],
    twitter.following,
  )
}

pub fn follow(twitter: Twitter, follower: Int, followee: Int) -> Twitter {
  Twitter(
    twitter.clock,
    twitter.tweets,
    dict.insert(
      twitter.following,
      follower,
      set.insert(followees(twitter, follower), followee),
    ),
  )
}

pub fn unfollow(twitter: Twitter, follower: Int, followee: Int) -> Twitter {
  Twitter(
    twitter.clock,
    twitter.tweets,
    dict.insert(
      twitter.following,
      follower,
      set.delete(followees(twitter, follower), followee),
    ),
  )
}

/// Every tweet is already newest-first, so the feed is a filter and a take.
/// Simple, and the wrong shape at scale \u{2014} it walks the whole global timeline
/// for one user's ten tweets.
pub fn news_feed(twitter: Twitter, user: Int) -> List(Int) {
  let visible = set.insert(followees(twitter, user), user)

  twitter.tweets
  |> list.filter(fn(entry) { set.contains(visible, entry.1) })
  |> list.take(10)
  |> list.map(fn(entry) { entry.2 })
}

fn followees(twitter: Twitter, user: Int) -> Set(Int) {
  result.unwrap(dict.get(twitter.following, user), set.new())
}
