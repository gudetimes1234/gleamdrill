from collections import deque


def canFinish(numCourses, prerequisites):
    # Kahn's algorithm. Courses with nothing outstanding can be taken now;
    # taking one releases whatever depended on it. If the process stalls with
    # courses left, those courses depend on each other in a circle -- a cycle is
    # exactly what "cannot be finished" means.
    waiting = {c: 0 for c in range(numCourses)}
    unlocks = {c: [] for c in range(numCourses)}

    for course, prereq in prerequisites:
        waiting[course] += 1
        unlocks[prereq].append(course)

    ready = deque(c for c in range(numCourses) if waiting[c] == 0)
    taken = 0

    while ready:
        course = ready.popleft()
        taken += 1
        for following in unlocks[course]:
            waiting[following] -= 1
            if waiting[following] == 0:
                ready.append(following)

    return taken == numCourses
