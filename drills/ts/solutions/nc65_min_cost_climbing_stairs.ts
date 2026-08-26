export function minCostClimbingStairs(cost: number[]): number {
  // Cost to stand on each step, carried forward: getting here means having paid
  // for one of the two steps below, whichever was cheaper. Two variables again,
  // because nothing older than two steps back can matter.
  let oneBack = 0;
  let twoBack = 0;
  for (const price of cost) [oneBack, twoBack] = [price + Math.min(oneBack, twoBack), oneBack];
  return Math.min(oneBack, twoBack);
}
