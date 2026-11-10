class Order:
    def __init__(self, quantity, item_price):
        self.quantity = quantity
        self.item_price = item_price

    def base_price(self):
        return self.quantity * self.item_price

    def discount_factor(self):
        return 0.95 if self.base_price() > 1000 else 0.98

    def price(self):
        return self.base_price() * self.discount_factor()
