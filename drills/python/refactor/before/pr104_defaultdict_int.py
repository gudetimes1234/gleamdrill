def degrees(edges):
    degree = {}
    for a, b in edges:
        if a in degree:
            degree[a] += 1
        else:
            degree[a] = 1
        if b in degree:
            degree[b] += 1
        else:
            degree[b] = 1
    return degree
