def top_three(scores):
    ranked = sorted(scores, reverse=True)
    top = []
    for i in range(3):
        if i < len(ranked):
            top.append(ranked[i])
    return top
