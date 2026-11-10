def is_pin(code):
    if len(code) != 4:
        return False
    for ch in code:
        if ch not in "0123456789":
            return False
    return True
