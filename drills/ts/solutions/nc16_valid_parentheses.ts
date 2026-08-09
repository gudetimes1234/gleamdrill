export function isValid(s: string): boolean {
  const closerFor: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
  const stack: string[] = [];
  for (const char of s) {
    if (closerFor[char]) {
      stack.push(closerFor[char]);
    } else if (stack.pop() !== char) {
      return false;
    }
  }
  return stack.length === 0;
}
