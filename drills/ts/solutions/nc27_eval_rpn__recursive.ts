const OPERATORS = new Set(["+", "-", "*", "/"]);

export function evalRPN(tokens: string[]): number {
  return take(tokens, tokens.length - 1)[0];
}

// Read right to left: the last token is the outermost operator, and each
// operator takes its right operand first because that is what sits nearer the
// end. Returns the value and the index still to be read.
function take(tokens: string[], i: number): [number, number] {
  const token = tokens[i];
  if (!OPERATORS.has(token)) return [Number(token), i - 1];
  const [right, afterRight] = take(tokens, i - 1);
  const [left, afterLeft] = take(tokens, afterRight);
  return [apply(token, left, right), afterLeft];
}

function apply(operator: string, a: number, b: number): number {
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  return Math.trunc(a / b);
}
