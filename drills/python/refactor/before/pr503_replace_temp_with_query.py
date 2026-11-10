class Order:
    def __init__(self, quantity, item_price):
        self.quantity = quantity
        self.item_price = item_price

    def price(self):
        base_price = self.quantity * self.item_price
        if base_price > 1000:
            discount_factor = 0.95
        else:
            discount_factor = 0.98
        return base_price * discount_factor
