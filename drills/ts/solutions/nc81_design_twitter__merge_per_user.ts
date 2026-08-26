export class Twitter {
  private clock = 0;
  private tweets = new Map<number, [number, number][]>();
  private following = new Map<number, Set<number>>();

  // Tweets stored per author rather than in one global list, newest last.
  postTweet(userId: number, tweetId: number): void {
    if (!this.tweets.has(userId)) this.tweets.set(userId, []);
    this.tweets.get(userId)!.push([this.clock++, tweetId]);
  }

  follow(followerId: number, followeeId: number): void {
    this.followees(followerId).add(followeeId);
  }

  unfollow(followerId: number, followeeId: number): void {
    this.followees(followerId).delete(followeeId);
  }

  // A k-way merge over the timelines of the people being followed, which only
  // ever needs the ten newest -- so a heap over the tails of the k lists does
  // it without touching every tweet.
  getNewsFeed(userId: number): number[] {
    const visible = new Set(this.followees(userId));
    visible.add(userId);

    const candidates: [number, number][] = [];
    for (const author of visible) candidates.push(...(this.tweets.get(author) ?? []).slice(-10));

    return candidates
      .sort((a, b) => b[0] - a[0])
      .slice(0, 10)
      .map(([, tweetId]) => tweetId);
  }

  private followees(userId: number): Set<number> {
    if (!this.following.has(userId)) this.following.set(userId, new Set());
    return this.following.get(userId)!;
  }
}
