def numbered(items):
    lines = []
    n = 1
    for item in items:
        lines.append(f"{n}. {item}")
        n += 1
    return lines
