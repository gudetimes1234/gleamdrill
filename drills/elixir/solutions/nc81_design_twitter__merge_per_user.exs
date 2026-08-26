defmodule Solution do
  def new, do: %{clock: 0, tweets: %{}, following: %{}}

  # Tweets stored per author rather than in one global list, newest first.
  def post_tweet(twitter, user, tweet) do
    %{
      twitter
      | clock: twitter.clock + 1,
        tweets: Map.update(twitter.tweets, user, [{twitter.clock, tweet}], &[{twitter.clock, tweet} | &1])
    }
  end

  def follow(twitter, follower, followee) do
    put_in(twitter.following[follower], MapSet.put(followees(twitter, follower), followee))
  end

  def unfollow(twitter, follower, followee) do
    put_in(twitter.following[follower], MapSet.delete(followees(twitter, follower), followee))
  end

  # A k-way merge over the timelines of the people being followed, which only
  # ever needs the ten newest -- so at scale a heap over the heads of the k
  # lists does it without touching every tweet. Written as a sort here, but the
  # shape is the point.
  def news_feed(twitter, user) do
    twitter
    |> followees(user)
    |> MapSet.put(user)
    |> Enum.flat_map(fn author -> twitter.tweets |> Map.get(author, []) |> Enum.take(10) end)
    |> Enum.sort_by(fn {clock, _tweet} -> clock end, :desc)
    |> Enum.take(10)
    |> Enum.map(fn {_clock, tweet} -> tweet end)
  end

  defp followees(twitter, user), do: Map.get(twitter.following, user, MapSet.new())
end
