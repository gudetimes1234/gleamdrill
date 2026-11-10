def finish_order(tasks):
    queue = list(tasks)
    order = []
    while queue:
        name, left = queue.pop(0)
        if left > 1:
            queue.append((name, left - 1))
        else:
            order.append(name)
    return order
