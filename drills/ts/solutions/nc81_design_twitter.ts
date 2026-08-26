export class Twitter {
  // The clock only ever increases, so it orders tweets across every user
  // without any real timestamps being involved.
  private clock = 0;
  private tweets: [number, number, number][] = [];
  private following = new Map<number, Set<number>>();

  postTweet(userId: number, tweetId: number): void {
    this.tweets.push([this.clock++, userId, tweetId]);
  }

  follow(followerId: number, followeeId: number): void {
    this.followees(followerId).add(followeeId);
  }

  unfollow(followerId: number, followeeId: number): void {
    this.followees(followerId).delete(followeeId);
  }

  // One global timeline, filtered. Simple, and the wrong shape at scale -- it
  // walks every tweet ever posted for one user's ten.
  getNewsFeed(userId: number): number[] {
    const visible = new Set(this.followees(userId));
    visible.add(userId);
    return [...this.tweets]
      .reverse()
      .filter(([, author]) => visible.has(author))
      .slice(0, 10)
      .map(([, , tweetId]) => tweetId);
  }

  private followees(userId: number): Set<number> {
    if (!this.following.has(userId)) this.following.set(userId, new Set());
    return this.following.get(userId)!;
  }
}
