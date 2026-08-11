export function characterReplacement(s: string, k: number): number {
  const counts = new Map<string, number>();
  let left = 0;
  let maxCount = 0;
  let longest = 0;

  for (let right = 0; right < s.length; right++) {
    const count = (counts.get(s[right]) ?? 0) + 1;
    counts.set(s[right], count);
    maxCount = Math.max(maxCount, count);

    while (right - left + 1 - maxCount > k) {
      counts.set(s[left], (counts.get(s[left]) ?? 1) - 1);
      left++;
    }

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}
