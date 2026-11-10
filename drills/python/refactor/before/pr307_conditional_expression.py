def item_count(count):
    if count == 1:
        word = "item"
    else:
        word = "items"
    return f"{count} {word}"
