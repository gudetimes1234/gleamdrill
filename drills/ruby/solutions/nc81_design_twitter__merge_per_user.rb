require "set"

class Twitter
  def initialize
    @clock = 0
    @tweets = {}
    @following = {}
  end

  # Tweets stored per author rather than in one global list, newest last.
  def post_tweet(user_id, tweet_id)
    (@tweets[user_id] ||= []) << [@clock, tweet_id]
    @clock += 1
  end

  # A k-way merge over the timelines of the people being followed, which only
  # ever needs the ten newest, so taking the ten largest of the last ten from
  # each author does it without touching every tweet. Enumerable#max(n) is
  # Ruby's heapq.nlargest, and it hands them back newest first.
  def get_news_feed(user_id)
    visible = @following.fetch(user_id, Set.new) | [user_id]
    candidates = visible.flat_map { |author| @tweets.fetch(author, []).last(10) }
    candidates.max(10).map(&:last)
  end

  def follow(follower_id, followee_id)
    (@following[follower_id] ||= Set.new) << followee_id
  end

  def unfollow(follower_id, followee_id)
    @following[follower_id]&.delete(followee_id)
  end
end
