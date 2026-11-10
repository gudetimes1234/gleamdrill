def runs(text):
    result = []
    for ch in text:
        if result and result[-1][0] == ch:
            result[-1] = (ch, result[-1][1] + 1)
        else:
            result.append((ch, 1))
    return result
