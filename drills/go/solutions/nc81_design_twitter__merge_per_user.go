package main

import "sort"

type tweet struct {
	time, id int
}

// Gather every candidate tweet from the user and their followees, sort by
// time, take ten. Simpler than a heap merge; fine while feeds are small.
type Twitter struct {
	clock   int
	tweets  map[int][]tweet
	follows map[int]map[int]bool
}

func Constructor() Twitter {
	return Twitter{tweets: map[int][]tweet{}, follows: map[int]map[int]bool{}}
}

func (t *Twitter) PostTweet(userId int, tweetId int) {
	t.clock++
	t.tweets[userId] = append(t.tweets[userId], tweet{t.clock, tweetId})
}

func (t *Twitter) GetNewsFeed(userId int) []int {
	candidates := append([]tweet{}, t.tweets[userId]...)
	for followee := range t.follows[userId] {
		if followee != userId {
			candidates = append(candidates, t.tweets[followee]...)
		}
	}
	sort.Slice(candidates, func(i, j int) bool { return candidates[i].time > candidates[j].time })
	feed := []int{}
	for i := 0; i < len(candidates) && i < 10; i++ {
		feed = append(feed, candidates[i].id)
	}
	return feed
}

func (t *Twitter) Follow(followerId int, followeeId int) {
	if t.follows[followerId] == nil {
		t.follows[followerId] = map[int]bool{}
	}
	t.follows[followerId][followeeId] = true
}

func (t *Twitter) Unfollow(followerId int, followeeId int) {
	delete(t.follows[followerId], followeeId)
}
