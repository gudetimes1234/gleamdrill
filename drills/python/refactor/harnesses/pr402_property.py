need("Cart")


def filled(*prices):
    cart = Cart()
    for price in prices:
        cart.add(price)
    return cart


def removing(prices, gone):
    cart = filled(*prices)
    cart.remove(gone)
    return cart


tc("Cart().total -- empty", 0, Cart().total)
tc("add(5), add(7) -> total", 12, filled(5, 7).total)
tc("add(5), add(7), remove(5) -> total", 7, removing([5, 7], 5).total)
tc("add(3), add(3) -> items", [3, 3], filled(3, 3).items)
uses(r"@property", "@property")
avoids(r"self\.total\s*[-+]?=", "updating self.total by hand")
