def merge_triplets(triplets, target)
  # A triplet with any component above the target can never be used: merging
  # takes maxima, so that component would be stuck too high forever. Throw
  # those away and the rest can all be merged, because a max only ever helps.
  best = [0, 0, 0]
  triplets.each do |triplet|
    next unless (0...3).all? { |i| triplet[i] <= target[i] }

    best = (0...3).map { |i| [best[i], triplet[i]].max }
  end
  best == target
end
