class Cart:
    def __init__(self):
        self.items = []
        self.total = 0

    def add(self, price):
        self.items.append(price)
        self.total = self.total + price

    def remove(self, price):
        self.items.remove(price)
        self.total = self.total - price
