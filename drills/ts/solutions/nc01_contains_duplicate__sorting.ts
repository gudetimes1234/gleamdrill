export function containsDuplicate(nums: number[]): boolean {
  // Duplicates are adjacent once sorted, so one pass over the sorted copy
  // answers it — O(n log n), but nothing has to hold every value at once.
  const ordered = [...nums].sort((a, b) => a - b);
  for (let i = 1; i < ordered.length; i++) {
    if (ordered[i] === ordered[i - 1]) return true;
  }
  return false;
}
