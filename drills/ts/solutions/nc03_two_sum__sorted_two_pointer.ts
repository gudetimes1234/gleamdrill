export function twoSum(nums: number[], target: number): number[] {
  const ordered = nums
    .map((num, index) => [num, index] as [number, number])
    .sort((a, b) => a[0] - b[0]);

  let left = 0;
  let right = ordered.length - 1;
  while (left < right) {
    const total = ordered[left][0] + ordered[right][0];
    if (total === target) {
      return [ordered[left][1], ordered[right][1]].sort((a, b) => a - b);
    }
    if (total < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}
