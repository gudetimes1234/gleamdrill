from collections import deque


def findOrder(numCourses, prerequisites):
    # The same Kahn's algorithm as deciding whether it is possible -- except the
    # order courses come off the ready list *is* the answer. Detecting the cycle
    # and producing the schedule are the same computation.
    waiting = {c: 0 for c in range(numCourses)}  # @1
    unlocks = {c: [] for c in range(numCourses)}  # @2

    for course, prereq in prerequisites:  # @3
        waiting[course] += 1  # @4
        unlocks[prereq].append(course)  # @5

    ready = deque(c for c in range(numCourses) if waiting[c] == 0)  # @6
    order = []  # @7

    while ready:  # @8
        course = ready.popleft()  # @9
        order.append(course)  # @10
        for following in unlocks[course]:  # @11
            waiting[following] -= 1  # @12
            if waiting[following] == 0:  # @13
                ready.append(following)  # @13

    # Stalled with courses left, so no order exists at all.
    return order if len(order) == numCourses else []  # @14
