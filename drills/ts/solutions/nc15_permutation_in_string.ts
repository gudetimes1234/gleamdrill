export function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  // Fixed 26-slot tallies, compared slot by slot as the window slides.
  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  const slot = (char: string) => char.charCodeAt(0) - 97;

  for (let i = 0; i < s1.length; i++) {
    need[slot(s1[i])]++;
    window[slot(s2[i])]++;
  }

  const matches = () => need.every((count, i) => count === window[i]);
  if (matches()) return true;

  for (let i = s1.length; i < s2.length; i++) {
    window[slot(s2[i])]++;
    window[slot(s2[i - s1.length])]--;
    if (matches()) return true;
  }

  return false;
}
