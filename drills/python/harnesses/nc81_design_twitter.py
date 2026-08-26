try:
    (Twitter)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__t__ = Twitter()
__t__.postTweet(1, 5)
__case__("getNewsFeed(1) after posting 5", [5], __t__.getNewsFeed(1))

__t__.follow(1, 2)
__t__.postTweet(2, 6)
__case__("getNewsFeed(1) after following 2 who posted 6", [6, 5], __t__.getNewsFeed(1))
__case__("getNewsFeed(2) sees only its own", [6], __t__.getNewsFeed(2))
__case__("getNewsFeed(3) for a user with nothing", [], __t__.getNewsFeed(3))

__t__.unfollow(1, 2)
__case__("getNewsFeed(1) after unfollowing 2", [5], __t__.getNewsFeed(1))

__eleven__ = Twitter()
for __i__ in range(1, 12):
    __eleven__.postTweet(1, __i__)
__case__("getNewsFeed caps at ten, newest first", [11, 10, 9, 8, 7, 6, 5, 4, 3, 2], __eleven__.getNewsFeed(1))
