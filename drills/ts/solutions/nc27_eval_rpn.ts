const OPERATORS = new Set(["+", "-", "*", "/"]);

export function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  for (const token of tokens) {
    if (OPERATORS.has(token) && stack.length >= 2) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(apply(token, a, b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack.length ? stack[stack.length - 1] : 0;
}

function apply(operator: string, a: number, b: number): number {
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  // trunc, not floor: the problem wants -3 / 2 to be -1.
  return Math.trunc(a / b);
}
