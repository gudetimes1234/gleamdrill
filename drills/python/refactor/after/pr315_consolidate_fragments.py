def price_with_shipping(subtotal, express):
    if express:
        total = subtotal + 15
    else:
        total = subtotal + 5
    return round(total * 1.08, 2)
