def ranking(scores):
    ordered = sorted(scores.items(), key=lambda pair: (-pair[1], pair[0]))
    return [name for name, _ in ordered]
