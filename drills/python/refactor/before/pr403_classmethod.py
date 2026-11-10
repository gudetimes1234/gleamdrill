class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @staticmethod
    def from_fahrenheit(fahrenheit):
        return Temperature((fahrenheit - 32) * 5 / 9)
