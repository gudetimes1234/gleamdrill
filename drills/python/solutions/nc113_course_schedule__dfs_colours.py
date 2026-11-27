def canFinish(numCourses, prerequisites):
    needs = {c: [] for c in range(numCourses)}  # @1
    for course, prereq in prerequisites:  # @2
        needs[course].append(prereq)  # @3

    onPath = set()  # @4
    done = set()  # @5

    # Depth-first with three states rather than two. "Seen" is not enough: a
    # node reached twice down *different* branches is fine, while a node reached
    # again while still on the current path is a cycle. The in-progress set is
    # what tells those apart.
    def visit(course):
        if course in onPath:  # @6
            return False  # @6
        if course in done:  # @7
            return True  # @7
        onPath.add(course)  # @8
        for prereq in needs[course]:  # @9
            if not visit(prereq):  # @10
                return False  # @10
        onPath.discard(course)  # @11
        done.add(course)  # @12
        return True  # @13

    return all(visit(course) for course in range(numCourses))  # @14
