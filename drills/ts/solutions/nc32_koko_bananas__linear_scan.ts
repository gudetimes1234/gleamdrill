export function minEatingSpeed(piles: number[], h: number): number {
  const highest = Math.max(...piles);
  let speed = 1;
  while (speed < highest && hours(piles, speed) > h) speed++;
  return speed;
}

function hours(piles: number[], speed: number): number {
  return piles.reduce((total, pile) => total + Math.ceil(pile / speed), 0);
}
