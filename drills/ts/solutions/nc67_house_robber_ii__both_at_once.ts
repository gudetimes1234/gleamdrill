export function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // One pass carrying both stories at the same time: the run that is allowed to
  // take the first house, and the run that is not. Neither ever looks at the
  // other, so this is the two-pass version interleaved -- useful when the input
  // can only be walked once.
  let withFirst: [number, number] = [0, 0];
  let withoutFirst: [number, number] = [0, 0];

  nums.forEach((value, i) => {
    if (i !== nums.length - 1) withFirst = step(withFirst, value);
    if (i !== 0) withoutFirst = step(withoutFirst, value);
  });

  return Math.max(withFirst[0], withoutFirst[0]);
}

function step(state: [number, number], value: number): [number, number] {
  const [best, previous] = state;
  return [Math.max(best, previous + value), best];
}
