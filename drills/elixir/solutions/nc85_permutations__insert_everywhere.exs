defmodule Solution do
  # Build up instead of choosing: every permutation of n elements is a
  # permutation of n-1 with the new element wedged into one of its n positions.
  # No recursion into a shrinking remainder, and it explains the factorial
  # directly -- one more choice of position at every step.
  def permute(nums) do
    Enum.reduce(nums, [[]], fn value, permutations ->
      for permutation <- permutations,
          at <- 0..length(permutation)//1,
          do: List.insert_at(permutation, at, value)
    end)
  end
end
