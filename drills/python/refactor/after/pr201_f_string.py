def receipt_line(name, quantity, price):
    return f"{name} x{quantity}: ${round(quantity * price, 2)}"
