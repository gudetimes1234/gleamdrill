def with_tax(prices):
    return [round(price * 1.2, 2) for price in prices]
