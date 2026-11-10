def line_totals(prices, quantities):
    totals = []
    for i in range(len(prices)):
        totals.append(prices[i] * quantities[i])
    return totals
