def permute(nums)
  # Build up instead of choosing: every permutation of n elements is a
  # permutation of n-1 with the new element wedged into one of its n
  # positions. No recursion into a shrinking remainder, and it explains the
  # factorial directly: one more choice of position at every step.
  permutations = [[]]
  nums.each do |value|
    permutations = permutations.flat_map do |permutation|
      (0..permutation.length).map { |at| permutation.dup.insert(at, value) }
    end
  end
  permutations
end
