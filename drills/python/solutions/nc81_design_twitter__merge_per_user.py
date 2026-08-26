import heapq


class Twitter:
    def __init__(self):
        self.clock = 0
        self.tweets = {}
        self.following = {}

    # Tweets stored per author rather than in one global list, newest last.
    def postTweet(self, userId, tweetId):
        self.tweets.setdefault(userId, []).append((self.clock, tweetId))
        self.clock += 1

    def follow(self, followerId, followeeId):
        self.following.setdefault(followerId, set()).add(followeeId)

    def unfollow(self, followerId, followeeId):
        self.following.setdefault(followerId, set()).discard(followeeId)

    # A k-way merge over the timelines of the people being followed, which only
    # ever needs the ten newest -- so a heap over the tails of the k lists does
    # it without touching every tweet.
    def getNewsFeed(self, userId):
        visible = self.following.get(userId, set()) | {userId}
        candidates = []
        for author in visible:
            candidates.extend(self.tweets.get(author, [])[-10:])
        return [tweetId for _clock, tweetId in heapq.nlargest(10, candidates)]
