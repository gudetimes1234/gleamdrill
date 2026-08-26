def findOrder(numCourses, prerequisites):
    needs = {c: [] for c in range(numCourses)}
    for course, prereq in prerequisites:
        needs[course].append(prereq)

    onPath = set()
    done = set()
    order = []

    # Depth-first, recording a course only *after* everything it depends on has
    # been recorded. That post-order is a valid schedule by construction -- no
    # indegrees to maintain -- and the in-progress set doubles as the cycle
    # check, which is what makes the impossible case fall out of the same walk.
    def visit(course):
        if course in onPath:
            return False
        if course in done:
            return True
        onPath.add(course)
        for prereq in needs[course]:
            if not visit(prereq):
                return False
        onPath.discard(course)
        done.add(course)
        order.append(course)
        return True

    if not all(visit(course) for course in range(numCourses)):
        return []
    return order
