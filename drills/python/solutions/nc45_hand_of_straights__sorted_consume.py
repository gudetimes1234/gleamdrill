def isNStraightHand(hand, groupSize):
    if groupSize <= 0 or len(hand) % groupSize != 0:
        return False

    # No counts: sort, then peel one full run off the front at a time, removing
    # each card as it is used. Slower -- every removal is a list walk -- but the
    # only thing to believe is that a group must begin with the smallest card
    # left.
    cards = sorted(hand)
    while cards:
        smallest = cards[0]
        for card in range(smallest, smallest + groupSize):
            if card not in cards:
                return False
            cards.remove(card)

    return True
