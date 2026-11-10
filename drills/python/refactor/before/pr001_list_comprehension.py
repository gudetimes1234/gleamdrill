def with_tax(prices):
    result = []
    for price in prices:
        result.append(round(price * 1.2, 2))
    return result
