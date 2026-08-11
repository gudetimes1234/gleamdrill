def joinUpper(chars):
    # The version join exists to replace. Each `+=` builds a whole new string,
    # so this is quadratic in the output length — fine for two characters,
    # painful for a megabyte.
    out = ""
    for c in chars:
        out += c.upper()
    return out
