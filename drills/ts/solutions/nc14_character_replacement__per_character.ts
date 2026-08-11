const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function characterReplacement(s: string, k: number): number {
  // One sweep per letter, asking a much simpler question each time: how long a
  // window can I hold if *this* is the letter I keep? No running frequency map
  // and no max-count bookkeeping — 26 easy passes instead of one subtle one.
  let longest = 0;

  for (const target of ALPHABET) {
    let left = 0;
    let others = 0;
    for (let right = 0; right < s.length; right++) {
      if (s[right] !== target) others++;
      while (others > k) {
        if (s[left] !== target) others--;
        left++;
      }
      longest = Math.max(longest, right - left + 1);
    }
  }

  return longest;
}
