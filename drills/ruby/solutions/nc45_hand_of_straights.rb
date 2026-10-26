def is_n_straight_hand(hand, group_size)
  return false if group_size <= 0 || hand.length % group_size != 0

  counts = hand.tally
  counts.default = 0

  # The smallest card left has no smaller neighbour to hide behind, so
  # whatever group it belongs to must start with it. That removes all choice,
  # which is what makes the greedy correct, and every copy of it needs its
  # own group, so they are all taken at once.
  counts.keys.sort.each do |smallest|
    copies = counts[smallest]
    next if copies.zero?

    (smallest...smallest + group_size).each do |card|
      return false if counts[card] < copies

      counts[card] -= copies
    end
  end

  true
end
