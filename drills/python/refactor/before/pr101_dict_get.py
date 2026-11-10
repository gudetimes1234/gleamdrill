def stock_level(stock, item):
    if item in stock:
        level = stock[item]
    else:
        level = 0
    return level
