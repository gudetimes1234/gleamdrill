package main

import (
	"container/heap"
	"sort"
)

type tweet struct {
	time, id int
}

type feedEntry struct {
	tweet  tweet
	userID int
	index  int // position in that user's tweets, counting from the newest
}

type newestFirst []feedEntry

func (h newestFirst) Len() int           { return len(h) }
func (h newestFirst) Less(i, j int) bool { return h[i].tweet.time > h[j].tweet.time }
func (h newestFirst) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *newestFirst) Push(x any)        { *h = append(*h, x.(feedEntry)) }
func (h *newestFirst) Pop() any {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}

// Each user's tweets in posting order; a feed merges the followed users'
// lists (plus the user's own) newest-first with a heap, k-way-merge style,
// stopping after ten.
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
	sources := []int{userId}
	for followee := range t.follows[userId] {
		if followee != userId {
			sources = append(sources, followee)
		}
	}
	sort.Ints(sources)
	h := &newestFirst{}
	for _, source := range sources {
		if list := t.tweets[source]; len(list) > 0 {
			heap.Push(h, feedEntry{list[len(list)-1], source, len(list) - 1})
		}
	}
	feed := []int{}
	for h.Len() > 0 && len(feed) < 10 {
		entry := heap.Pop(h).(feedEntry)
		feed = append(feed, entry.tweet.id)
		if entry.index > 0 {
			list := t.tweets[entry.userID]
			heap.Push(h, feedEntry{list[entry.index-1], entry.userID, entry.index - 1})
		}
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
