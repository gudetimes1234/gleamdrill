def bfsOrder(graph, start):
    # A list plus a read cursor. The cursor is the point: list.pop(0) is O(n),
    # so a plain list only stays a good queue if you never shift it.
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
