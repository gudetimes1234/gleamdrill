import heapq


class Twitter:
    def __init__(self):
        self.clock = 0  # @1
        self.tweets = {}  # @2
        self.following = {}  # @3

    # Tweets stored per author rather than in one global list, newest last.
    def postTweet(self, userId, tweetId):
        self.tweets.setdefault(userId, []).append((self.clock, tweetId))  # @4
        self.clock += 1  # @5

    def follow(self, followerId, followeeId):
        self.following.setdefault(followerId, set()).add(followeeId)  # @6

    def unfollow(self, followerId, followeeId):
        self.following.setdefault(followerId, set()).discard(followeeId)  # @7

    # A k-way merge over the timelines of the people being followed, which only
    # ever needs the ten newest -- so a heap over the tails of the k lists does
    # it without touching every tweet.
    def getNewsFeed(self, userId):
        visible = self.following.get(userId, set()) | {userId}  # @8
        candidates = []  # @9
        for author in visible:  # @10
            candidates.extend(self.tweets.get(author, [])[-10:])  # @11
        return [tweetId for _clock, tweetId in heapq.nlargest(10, candidates)]  # @12
