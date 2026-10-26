need :Twitter

t = Twitter.new
t.post_tweet(1, 5)
tc "get_news_feed(1) after posting 5", [5], t.get_news_feed(1)

t.follow(1, 2)
t.post_tweet(2, 6)
tc "get_news_feed(1) after following 2 who posted 6", [6, 5], t.get_news_feed(1)
tc "get_news_feed(2) sees only its own", [6], t.get_news_feed(2)
tc "get_news_feed(3) for a user with nothing", [], t.get_news_feed(3)

t.unfollow(1, 2)
tc "get_news_feed(1) after unfollowing 2", [5], t.get_news_feed(1)

eleven = Twitter.new
(1..11).each { |i| eleven.post_tweet(1, i) }
tc "get_news_feed caps at ten, newest first", [11, 10, 9, 8, 7, 6, 5, 4, 3, 2], eleven.get_news_feed(1)
