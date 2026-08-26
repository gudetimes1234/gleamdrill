export function largestRectangleArea(heights: number[]): number {
  let best = 0;

  for (let i = 0; i < heights.length; i++) {
    // How far this bar's own height can spread in each direction. O(n^2), and
    // the definition of the answer: every rectangle is some bar taken as far as
    // it will go.
    let left = i;
    while (left > 0 && heights[left - 1] >= heights[i]) left--;
    let right = i;
    while (right + 1 < heights.length && heights[right + 1] >= heights[i]) right++;
    best = Math.max(best, heights[i] * (right - left + 1));
  }

  return best;
}
