export function twoSum(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    const wanted = target - numbers[i];
    let lo = i + 1;
    let hi = numbers.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (numbers[mid] === wanted) return [i + 1, mid + 1];
      if (numbers[mid] < wanted) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }
  return [];
}
