export function isPalindrome(s: string): boolean {
  // Strip, then compare against the reverse. Allocates a second string instead
  // of converging two pointers, but it is one line of intent.
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === [...cleaned].reverse().join("");
}
