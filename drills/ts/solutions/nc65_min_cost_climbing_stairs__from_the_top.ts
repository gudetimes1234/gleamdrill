export function minCostClimbingStairs(cost: number[]): number {
  // The same recurrence read the other way: instead of "what did it cost to get
  // here", ask "what will it cost to finish from here". Walking backwards, the
  // answer at each step is its own price plus the cheaper of the two ahead, and
  // the start is the better of the first two.
  let oneAhead = 0;
  let twoAhead = 0;
  for (let i = cost.length - 1; i >= 0; i--) {
    [oneAhead, twoAhead] = [cost[i] + Math.min(oneAhead, twoAhead), oneAhead];
  }
  return Math.min(oneAhead, twoAhead);
}
