defmodule Solution do
  # The clock only ever increases, so it orders tweets across every user without
  # any real timestamps being involved.
  def new, do: %{clock: 0, tweets: [], following: %{}}

  def post_tweet(twitter, user, tweet) do
    %{
      twitter
      | clock: twitter.clock + 1,
        tweets: [{twitter.clock, user, tweet} | twitter.tweets]
    }
  end

  def follow(twitter, follower, followee) do
    put_in(twitter.following[follower], MapSet.put(followees(twitter, follower), followee))
  end

  def unfollow(twitter, follower, followee) do
    put_in(twitter.following[follower], MapSet.delete(followees(twitter, follower), followee))
  end

  # Every tweet is already newest-first, so the feed is a filter and a take.
  # Simple, and the wrong shape at scale -- it walks the whole global timeline
  # for one user's ten tweets.
  def news_feed(twitter, user) do
    visible = MapSet.put(followees(twitter, user), user)

    twitter.tweets
    |> Enum.filter(fn {_clock, author, _tweet} -> MapSet.member?(visible, author) end)
    |> Enum.take(10)
    |> Enum.map(fn {_clock, _author, tweet} -> tweet end)
  end

  defp followees(twitter, user), do: Map.get(twitter.following, user, MapSet.new())
end
