class Card
  def initialize(rank, suit)
    @rank = rank
    @suit = suit
  end

  def debug_string
    "#<Card #{@rank}#{@suit}>"
  end
end

def hand_summary(cards)
  "[" + cards.map { |card| card.debug_string }.join(", ") + "]"
end
