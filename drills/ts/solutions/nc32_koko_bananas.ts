export function minEatingSpeed(piles: number[], h: number): number {
  // The search space is the answer, not the input. Feasibility is monotone --
  // if a speed finishes in time then so does every faster one -- which is
  // exactly the property halving needs.
  let low = 1;
  let high = Math.max(...piles);
  while (low < high) {
    const mid = (low + high) >> 1;
    if (hours(piles, mid) <= h) high = mid;
    else low = mid + 1;
  }
  return low;
}

// A pile never shares an hour with another, so each costs ceil(pile / speed).
function hours(piles: number[], speed: number): number {
  return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);
}
