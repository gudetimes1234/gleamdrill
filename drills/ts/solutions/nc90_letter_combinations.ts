const KEYPAD: Record<string, string> = {
  "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
  "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
};

export function letterCombinations(digits: string): string[] {
  if (digits === "") return [];
  return build(digits);
}

// One choice per digit, independently -- so the answer is the cross product of
// the letter sets. Written as a recursion here: pick a letter for the first
// digit, then every combination of the rest.
function build(digits: string): string[] {
  if (digits === "") return [""];
  const tails = build(digits.slice(1));
  return [...(KEYPAD[digits[0]] ?? "")].flatMap((letter) =>
    tails.map((tail) => letter + tail),
  );
}
