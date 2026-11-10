def price_lines(prices):
    lines = []
    for name, price in prices.items():
        lines.append(f"{name}: {price:.2f}")
    return lines
