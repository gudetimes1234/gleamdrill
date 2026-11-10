def in_stock(stock):
    result = {}
    for item, count in stock.items():
        if count > 0:
            result[item] = count
    return result
