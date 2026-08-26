export function permute(nums: number[]): number[][] {
  // Pick each element in turn as the first, then permute what is left. Removing
  // the chosen element from the remainder is what the "used" set does in an
  // in-place version -- here the remainder is simply a shorter array.
  if (nums.length === 0) return [[]];
  return nums.flatMap((value, i) =>
    permute([...nums.slice(0, i), ...nums.slice(i + 1)]).map((tail) => [value, ...tail]),
  );
}
