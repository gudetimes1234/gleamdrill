export function productExceptSelf(nums: number[]): number[] {
  return nums.map((_, i) => {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) product *= nums[j];
    }
    return product;
  });
}
