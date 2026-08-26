from collections import deque


def findOrder(numCourses, prerequisites):
    # The same Kahn's algorithm as deciding whether it is possible -- except the
    # order courses come off the ready list *is* the answer. Detecting the cycle
    # and producing the schedule are the same computation.
    waiting = {c: 0 for c in range(numCourses)}
    unlocks = {c: [] for c in range(numCourses)}

    for course, prereq in prerequisites:
        waiting[course] += 1
        unlocks[prereq].append(course)

    ready = deque(c for c in range(numCourses) if waiting[c] == 0)
    order = []

    while ready:
        course = ready.popleft()
        order.append(course)
        for following in unlocks[course]:
            waiting[following] -= 1
            if waiting[following] == 0:
                ready.append(following)

    # Stalled with courses left, so no order exists at all.
    return order if len(order) == numCourses else []
