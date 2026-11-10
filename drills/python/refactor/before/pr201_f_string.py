def receipt_line(name, quantity, price):
    return name + " x" + str(quantity) + ": $" + str(round(quantity * price, 2))
