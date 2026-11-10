def ranking(scores):
    pairs = []
    for name in scores:
        pairs.append((-scores[name], name))
    pairs.sort()
    return [name for _, name in pairs]
