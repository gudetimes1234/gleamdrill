export function generateParenthesis(n: number): string[] {
  const out: string[] = [];

  // Two counters, one rule each: an opener is legal while any are left, and a
  // closer is legal only while more are outstanding than openers. Everything
  // reached with both at zero is valid by construction.
  const build = (openLeft: number, closeLeft: number, current: string) => {
    if (openLeft === 0 && closeLeft === 0) {
      out.push(current);
      return;
    }
    if (openLeft > 0) build(openLeft - 1, closeLeft, current + "(");
    if (closeLeft > openLeft) build(openLeft, closeLeft - 1, current + ")");
  };

  build(n, n, "");
  return out;
}
