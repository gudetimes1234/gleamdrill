def in_stock(stock):
    return {item: count for item, count in stock.items() if count > 0}
