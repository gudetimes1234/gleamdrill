def cart_total(lines):
    return sum(price * quantity for price, quantity in lines)
