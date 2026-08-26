class Twitter:
    def __init__(self):
        # The clock only ever increases, so it orders tweets across every user
        # without any real timestamps being involved.
        self.clock = 0
        self.tweets = []
        self.following = {}

    def postTweet(self, userId, tweetId):
        self.tweets.append((self.clock, userId, tweetId))
        self.clock += 1

    def follow(self, followerId, followeeId):
        self.following.setdefault(followerId, set()).add(followeeId)

    def unfollow(self, followerId, followeeId):
        self.following.setdefault(followerId, set()).discard(followeeId)

    # One global timeline, filtered. Simple, and the wrong shape at scale -- it
    # walks every tweet ever posted for one user's ten.
    def getNewsFeed(self, userId):
        visible = self.following.get(userId, set()) | {userId}
        return [
            tweetId
            for _clock, author, tweetId in reversed(self.tweets)
            if author in visible
        ][:10]
