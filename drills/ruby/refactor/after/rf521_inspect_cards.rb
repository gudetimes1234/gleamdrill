class Card
  def initialize(rank, suit)
    @rank = rank
    @suit = suit
  end

  def inspect
    "#<Card #{@rank}#{@suit}>"
  end
end

def hand_summary(cards)
  cards.inspect
end
