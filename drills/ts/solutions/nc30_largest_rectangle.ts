export function largestRectangleArea(heights: number[]): number {
  const stack: [number, number][] = [];
  let best = 0;

  for (let i = 0; i < heights.length; i++) {
    let start = i;
    // Anything taller than the new bar can never extend past it, so its
    // rectangle is finished here. Whatever it reached back to becomes this
    // bar's own starting point.
    while (stack.length && stack[stack.length - 1][1] > heights[i]) {
      const [from, tall] = stack.pop()!;
      best = Math.max(best, tall * (i - from));
      start = from;
    }
    stack.push([start, heights[i]]);
  }

  // Whatever survives was never cut off, so it runs to the far end.
  for (const [from, tall] of stack) {
    best = Math.max(best, tall * (heights.length - from));
  }

  return best;
}
