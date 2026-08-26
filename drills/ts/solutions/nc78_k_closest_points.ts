export function kClosest(points: number[][], k: number): number[][] {
  // Sorting by *squared* distance rather than distance: the square root is
  // monotonic, so it cannot change the order, and skipping it keeps everything
  // in integers with no rounding to argue about.
  return [...points].sort((a, b) => squared(a) - squared(b)).slice(0, k);
}

function squared(point: number[]): number {
  return point[0] * point[0] + point[1] * point[1];
}
