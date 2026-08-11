export function productExceptSelf(nums: number[]): number[] {
  // The obvious O(n^2) reading: for each slot, multiply everything that is not
  // in it. Worth knowing as the thing prefix/suffix beats.
  return nums.map((_, i) => {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) product *= nums[j];
    }
    return product;
  });
}
