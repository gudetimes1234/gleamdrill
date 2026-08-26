def bfsOrder(graph, start):
    queue = [start]
    head = 0
    seen = {start}
    order = []

    while head < len(queue):
        node = queue[head]
        head += 1
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)

    return order
