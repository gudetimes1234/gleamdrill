export function singleNumber(nums: number[]): number {
  // Twice the sum of the distinct values counts every pair twice and the lone
  // value twice; subtracting the real total leaves the lone value. No bit
  // tricks, but it leans harder on the promise that everything else is a pair.
  const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
  return 2 * sum([...new Set(nums)]) - sum(nums);
}
