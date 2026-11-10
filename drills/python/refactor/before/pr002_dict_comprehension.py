def price_index(items):
    index = {}
    for name, price in items:
        index[name.lower()] = price
    return index
