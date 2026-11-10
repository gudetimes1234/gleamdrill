def price_with_shipping(subtotal, express):
    if express:
        total = subtotal + 15
        total = round(total * 1.08, 2)
    else:
        total = subtotal + 5
        total = round(total * 1.08, 2)
    return total
