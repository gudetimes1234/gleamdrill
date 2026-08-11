export function lengthOfLongestSubstring(s: string): number {
  // No set: ask the string itself whether this character already appeared
  // inside the current window, and if so restart just past it.
  let longest = 0;
  let start = 0;

  for (let right = 0; right < s.length; right++) {
    const found = s.slice(start, right).indexOf(s[right]);
    if (found !== -1) start = start + found + 1;
    longest = Math.max(longest, right - start + 1);
  }

  return longest;
}
