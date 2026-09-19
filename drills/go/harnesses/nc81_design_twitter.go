package main

func main() {
	run(func() []testCase {
		t := Constructor()
		t.PostTweet(1, 5)
		cases := []testCase{
			tc("getNewsFeed(1) after posting 5", []int{5}, t.GetNewsFeed(1)),
		}
		t.Follow(1, 2)
		t.PostTweet(2, 6)
		cases = append(cases,
			tc("getNewsFeed(1) after following 2 who posted 6", []int{6, 5}, t.GetNewsFeed(1)),
			tc("getNewsFeed(2) sees only its own", []int{6}, t.GetNewsFeed(2)),
			tc("getNewsFeed(3) for a user with nothing", []int{}, t.GetNewsFeed(3)))
		t.Unfollow(1, 2)
		cases = append(cases, tc("getNewsFeed(1) after unfollowing 2", []int{5}, t.GetNewsFeed(1)))
		eleven := Constructor()
		for i := 1; i <= 11; i++ {
			eleven.PostTweet(1, i)
		}
		cases = append(cases, tc("getNewsFeed(1) caps at the ten most recent", []int{11, 10, 9, 8, 7, 6, 5, 4, 3, 2}, eleven.GetNewsFeed(1)))
		return cases
	})
}
