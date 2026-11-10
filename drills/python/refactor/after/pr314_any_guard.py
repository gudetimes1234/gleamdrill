def checkout(cart):
    if any(item["qty"] <= 0 for item in cart):
        return "invalid cart"
    return f"{len(cart)} lines"
