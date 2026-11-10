from collections import deque


def finish_order(tasks):
    queue = deque(tasks)
    order = []
    while queue:
        name, left = queue.popleft()
        if left > 1:
            queue.append((name, left - 1))
        else:
            order.append(name)
    return order
