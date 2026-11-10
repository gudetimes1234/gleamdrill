class Cart:
    def __init__(self):
        self.items = []

    def add(self, price):
        self.items.append(price)

    def remove(self, price):
        self.items.remove(price)

    @property
    def total(self):
        return sum(self.items)
