export function trap(height: number[]): number {
  const left: number[] = [];
  let best = 0;
  for (const h of height) {
    best = Math.max(best, h);
    left.push(best);
  }

  const right = new Array<number>(height.length);
  best = 0;
  for (let i = height.length - 1; i >= 0; i--) {
    best = Math.max(best, height[i]);
    right[i] = best;
  }

  return height.reduce((total, h, i) => total + Math.min(left[i], right[i]) - h, 0);
}
