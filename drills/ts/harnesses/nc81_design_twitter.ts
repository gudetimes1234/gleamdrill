import * as solution from "./solution";

const show = (v: unknown) => JSON.stringify(v) ?? "undefined";

export function run(): [string, string, string][] {
  if (typeof solution.Twitter !== "function") throw new Error("__signature_mismatch__");

  const t = new solution.Twitter();
  t.postTweet(1, 5);
  const cases: [string, string, string][] = [
    ["getNewsFeed(1) after posting 5", show([5]), show(t.getNewsFeed(1))],
  ];

  t.follow(1, 2);
  t.postTweet(2, 6);
  cases.push(["getNewsFeed(1) after following 2 who posted 6", show([6, 5]), show(t.getNewsFeed(1))]);
  cases.push(["getNewsFeed(2) sees only its own", show([6]), show(t.getNewsFeed(2))]);
  cases.push(["getNewsFeed(3) for a user with nothing", show([]), show(t.getNewsFeed(3))]);

  t.unfollow(1, 2);
  cases.push(["getNewsFeed(1) after unfollowing 2", show([5]), show(t.getNewsFeed(1))]);

  const eleven = new solution.Twitter();
  for (let i = 1; i <= 11; i++) eleven.postTweet(1, i);
  cases.push(["getNewsFeed caps at ten, newest first", show([11, 10, 9, 8, 7, 6, 5, 4, 3, 2]), show(eleven.getNewsFeed(1))]);

  return cases;
}
