def cheapest(offers):
    best = offers[0]
    for offer in offers:
        if offer["price"] < best["price"]:
            best = offer
    return best["shop"]
