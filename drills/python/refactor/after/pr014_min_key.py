def cheapest(offers):
    return min(offers, key=lambda offer: offer["price"])["shop"]
