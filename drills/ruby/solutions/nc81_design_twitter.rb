require "set"

class Twitter
  def initialize
    # The clock only ever increases, so it orders tweets across every user
    # without any real timestamps being involved.
    @clock = 0
    @tweets = []
    @following = {}
  end

  def post_tweet(user_id, tweet_id)
    @tweets << [@clock, user_id, tweet_id]
    @clock += 1
  end

  # One global timeline, filtered. Simple, and the wrong shape at scale: it
  # walks every tweet ever posted for one user's ten.
  def get_news_feed(user_id)
    visible = @following.fetch(user_id, Set.new) | [user_id]
    @tweets.reverse.select { |_clock, author, _id| visible.include?(author) }.map(&:last).first(10)
  end

  def follow(follower_id, followee_id)
    (@following[follower_id] ||= Set.new) << followee_id
  end

  def unfollow(follower_id, followee_id)
    @following[follower_id]&.delete(followee_id)
  end
end
