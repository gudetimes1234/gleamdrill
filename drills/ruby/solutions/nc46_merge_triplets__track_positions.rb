def merge_triplets(triplets, target)
  # Ask a different question: is each of the three positions hit exactly by
  # some usable triplet? The answer is yes exactly when all three are covered:
  # the same condition, arrived at without taking maxima.
  usable = triplets.select { |t| (0...3).all? { |i| t[i] <= target[i] } }
  (0...3).all? { |i| usable.any? { |t| t[i] == target[i] } }
end
