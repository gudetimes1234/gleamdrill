def checkout(cart):
    has_bad = False
    for item in cart:
        if item["qty"] <= 0:
            has_bad = True
    if has_bad:
        return "invalid cart"
    return f"{len(cart)} lines"
