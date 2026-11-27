class Twitter:
    def __init__(self):
        # The clock only ever increases, so it orders tweets across every user
        # without any real timestamps being involved.
        self.clock = 0  # @1
        self.tweets = []  # @2
        self.following = {}  # @3

    def postTweet(self, userId, tweetId):
        self.tweets.append((self.clock, userId, tweetId))  # @4
        self.clock += 1  # @5

    def follow(self, followerId, followeeId):
        self.following.setdefault(followerId, set()).add(followeeId)  # @6

    def unfollow(self, followerId, followeeId):
        self.following.setdefault(followerId, set()).discard(followeeId)  # @7

    # One global timeline, filtered. Simple, and the wrong shape at scale -- it
    # walks every tweet ever posted for one user's ten.
    def getNewsFeed(self, userId):
        visible = self.following.get(userId, set()) | {userId}  # @8
        return [  # @9
            tweetId  # @9
            for _clock, author, tweetId in reversed(self.tweets)  # @10
            if author in visible  # @11
        ][:10]  # @12
