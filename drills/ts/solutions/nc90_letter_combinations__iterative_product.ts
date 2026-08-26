const KEYPAD: Record<string, string> = {
  "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
  "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
};

export function letterCombinations(digits: string): string[] {
  if (digits === "") return [];

  // The same cross product built by folding rather than recursing: hold every
  // combination of the digits seen so far and extend each by every letter of
  // the next. No call stack, and the growth is visible -- the list multiplies
  // in size at each step.
  let combinations = [""];
  for (const digit of digits) {
    combinations = combinations.flatMap((prefix) =>
      [...(KEYPAD[digit] ?? "")].map((letter) => prefix + letter),
    );
  }
  return combinations;
}
