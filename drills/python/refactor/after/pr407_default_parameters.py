def format_price(amount, symbol="$", places=2):
    return f"{symbol}{amount:.{places}f}"


def format_price_euro(amount):
    return format_price(amount, symbol="€")


def format_price_rounded(amount):
    return format_price(amount, places=0)
