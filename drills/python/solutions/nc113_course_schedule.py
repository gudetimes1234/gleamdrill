from collections import deque


def canFinish(numCourses, prerequisites):
    # Kahn's algorithm. Courses with nothing outstanding can be taken now;
    # taking one releases whatever depended on it. If the process stalls with
    # courses left, those courses depend on each other in a circle -- a cycle is
    # exactly what "cannot be finished" means.
    waiting = {c: 0 for c in range(numCourses)}  # @1
    unlocks = {c: [] for c in range(numCourses)}  # @2

    for course, prereq in prerequisites:  # @3
        waiting[course] += 1  # @4
        unlocks[prereq].append(course)  # @5

    ready = deque(c for c in range(numCourses) if waiting[c] == 0)  # @6
    taken = 0  # @7

    while ready:  # @8
        course = ready.popleft()  # @9
        taken += 1  # @10
        for following in unlocks[course]:  # @11
            waiting[following] -= 1  # @12
            if waiting[following] == 0:  # @13
                ready.append(following)  # @13

    return taken == numCourses  # @14
