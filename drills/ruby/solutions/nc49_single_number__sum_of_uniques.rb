def single_number(nums)
  # Twice the sum of the distinct values counts every pair twice and the lone
  # value twice; subtracting the real total leaves the lone value. No bit
  # tricks, but it leans harder on the promise that everything else is a pair.
  2 * nums.uniq.sum - nums.sum
end
