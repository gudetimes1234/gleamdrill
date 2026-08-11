export function lengthOfLongestSubstring(s: string): number {
  const window = new Set<string>();
  let left = 0;
  let longest = 0;

  for (let right = 0; right < s.length; right++) {
    while (window.has(s[right])) {
      window.delete(s[left]);
      left++;
    }
    window.add(s[right]);
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}
