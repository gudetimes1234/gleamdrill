from collections import defaultdict


def degrees(edges):
    degree = defaultdict(int)
    for a, b in edges:
        degree[a] += 1
        degree[b] += 1
    return dict(degree)
