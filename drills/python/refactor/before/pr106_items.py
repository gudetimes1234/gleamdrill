def price_lines(prices):
    lines = []
    for name in prices:
        lines.append(f"{name}: {prices[name]:.2f}")
    return lines
