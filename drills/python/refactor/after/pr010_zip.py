def line_totals(prices, quantities):
    return [price * quantity for price, quantity in zip(prices, quantities)]
