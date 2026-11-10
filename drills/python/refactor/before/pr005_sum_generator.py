def cart_total(lines):
    total = 0
    for price, quantity in lines:
        total += price * quantity
    return total
