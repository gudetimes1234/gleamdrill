def is_n_straight_hand(hand, group_size)
  return false if group_size <= 0 || hand.length % group_size != 0

  # No counts: sort, then peel one full run off the front at a time, removing
  # each card as it is used. Slower, since every removal is a list walk, but
  # the only thing to believe is that a group must begin with the smallest
  # card left.
  cards = hand.sort
  until cards.empty?
    smallest = cards[0]
    (smallest...smallest + group_size).each do |card|
      at = cards.index(card)
      return false if at.nil?

      cards.delete_at(at)
    end
  end

  true
end
