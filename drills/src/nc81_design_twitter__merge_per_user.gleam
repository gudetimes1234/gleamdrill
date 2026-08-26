import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/result
import gleam/set.{type Set}

pub type Twitter {
  Twitter(
    clock: Int,
    tweets: Dict(Int, List(#(Int, Int))),
    following: Dict(Int, Set(Int)),
  )
}

pub fn new() -> Twitter {
  Twitter(0, dict.new(), dict.new())
}

/// Tweets stored per author rather than in one global list, newest first.
pub fn post_tweet(twitter: Twitter, user: Int, tweet: Int) -> Twitter {
  Twitter(
    twitter.clock + 1,
    dict.insert(twitter.tweets, user, [
      #(twitter.clock, tweet),
      ..timeline(twitter, user)
    ]),
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

/// A k-way merge over the timelines of the people being followed, which only
/// ever needs the ten newest \u{2014} so at scale a heap over the heads of the k
/// lists does it in O(10 log k) rather than touching every tweet. The merge is
/// written as a sort here, but the shape is the point.
pub fn news_feed(twitter: Twitter, user: Int) -> List(Int) {
  set.insert(followees(twitter, user), user)
  |> set.to_list
  |> list.flat_map(fn(author) { list.take(timeline(twitter, author), 10) })
  |> list.sort(fn(a: #(Int, Int), b: #(Int, Int)) { int.compare(b.0, a.0) })
  |> list.take(10)
  |> list.map(fn(entry) { entry.1 })
}

fn timeline(twitter: Twitter, user: Int) -> List(#(Int, Int)) {
  result.unwrap(dict.get(twitter.tweets, user), [])
}

fn followees(twitter: Twitter, user: Int) -> Set(Int) {
  result.unwrap(dict.get(twitter.following, user), set.new())
}
