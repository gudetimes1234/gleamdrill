def findOrder(numCourses, prerequisites):
    needs = {c: [] for c in range(numCourses)}  # @1
    for course, prereq in prerequisites:  # @2
        needs[course].append(prereq)  # @3

    onPath = set()  # @4
    done = set()  # @5
    order = []  # @6

    # Depth-first, recording a course only *after* everything it depends on has
    # been recorded. That post-order is a valid schedule by construction -- no
    # indegrees to maintain -- and the in-progress set doubles as the cycle
    # check, which is what makes the impossible case fall out of the same walk.
    def visit(course):
        if course in onPath:  # @7
            return False  # @7
        if course in done:  # @8
            return True  # @8
        onPath.add(course)  # @9
        for prereq in needs[course]:  # @10
            if not visit(prereq):  # @11
                return False  # @11
        onPath.discard(course)  # @12
        done.add(course)  # @13
        order.append(course)  # @14
        return True  # @15

    if not all(visit(course) for course in range(numCourses)):  # @16
        return []  # @16
    return order  # @17
